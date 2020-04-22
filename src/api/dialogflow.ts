import config from "@/options/config.json";
import { SessionsClient } from "@google-cloud/dialogflow";
import { Message } from "discord.js";

export interface DfResponse {
  reply: string;
  commandName?: string;
  args?: any;
}

const dfClient = new SessionsClient({
  credentials: JSON.parse(process.env.GCP_CREDENTIALS)
});

function removeMention(str: string): string {
  return str.slice(str.indexOf(">") + 1, str.length);
}

export async function requestFromDialogflow(
  message: Message
): Promise<DfResponse> {
  let reply: string;
  let commandName: string;
  let args: string[];

  const sessionPath = dfClient.projectAgentSessionPath(
    process.env.GCP_ID,
    message.author.id
  );
  const request = {
    session: sessionPath,
    queryInput: {
      text: {
        text: removeMention(message.content),
        languageCode: "en-US"
      }
    }
  };

  try {
    const intent = await dfClient.detectIntent(request);
    const result = intent[0].queryResult;
    if (
      result.intent.displayName !== "" &&
      result.intent.displayName !== "Default Fallback Intent" &&
      result.allRequiredParamsPresent
    ) {
      commandName = result.intent.displayName;
      args = Object.values(result.parameters.fields).map(
        value => value.stringValue
      );
    } else {
      reply = result.fulfillmentText;
    }
  } catch (error) {
    console.log(error);
    reply = config.text.error.df;
  }

  return { reply, commandName, args };
}
