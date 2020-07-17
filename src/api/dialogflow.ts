import config from "@/config.json";
import { SessionsClient, EntityTypesClient } from "@google-cloud/dialogflow";
import { Message } from "discord.js";
import { ArgsMap } from "@/utils/command";

const dfClient = new SessionsClient({
  credentials: JSON.parse(process.env.GCP_CREDENTIALS),
});

export interface DfResponse {
  reply: string;
  commandName?: string;
  args?: any;
}

function removeMention(str: string): string {
  return str.slice(str.indexOf(">") + 1, str.length);
}

export async function requestFromDialogflow(
  message: Message
): Promise<DfResponse> {
  let reply: string;
  let commandName: string;
  let args: ArgsMap;

  const sessionPath = dfClient.projectAgentSessionPath(
    process.env.GCP_ID,
    message.author.id
  );
  const request = {
    session: sessionPath,
    queryInput: {
      text: {
        text: removeMention(message.content),
        languageCode: "en-US",
      },
    },
  };

  try {
    const intent = await dfClient.detectIntent(request);
    const result = intent[0].queryResult;
    reply = result.fulfillmentText;

    if (
      result.allRequiredParamsPresent &&
      result.intent.displayName !== "" &&
      result.intent.displayName !== "Default Fallback Intent"
    ) {
      commandName = result.intent.displayName;
      args = Object.entries(result.parameters.fields).reduce(
        (map, [key, value]) => {
          return map.set(
            key,
            value.stringValue ?? value.numberValue.toString()
          );
        },
        new Map()
      );
    }
  } catch (error) {
    console.log(error);
    reply = config.text.error.df;
  }

  return { reply, commandName, args };
}

export async function updateDialogflowEntityEntry(
  entityName: string,
  entry: string,
  synonyms?: string[]
) {
  const entClient = new EntityTypesClient({
    credentials: JSON.parse(process.env.GCP_CREDENTIALS),
    projectId: process.env.GCP_ID,
  });
  const parentPath = `projects/${process.env.GCP_ID}/agent`;
  const dfEntities = await entClient.listEntityTypes({
    parent: parentPath,
  });
  const entityType = dfEntities[0].find(
    (entity) => entity.displayName === entityName
  );
  await entClient.batchCreateEntities({
    parent: entityType.name,
    entities: [
      {
        value: entry,
        synonyms,
      },
    ],
  });
}
