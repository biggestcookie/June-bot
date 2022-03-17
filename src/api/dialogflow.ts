import { SessionsClient } from "@google-cloud/dialogflow";
import { Message } from "discord.js";
import config from "../config.json";
import { log, logError } from "../utils/logger";

export interface DialogflowResponse {
  reply: string;
  commandName?: string;
  args?: Record<string, string> | null;
}

const dialogflowClient = new SessionsClient({
  credentials: JSON.parse(process.env.GCP_CREDENTIALS!),
});

export async function getFromDialogFlow(
  message: Message
): Promise<DialogflowResponse> {
  const response: DialogflowResponse = {
    reply: config.text.error.dialogflow,
  };

  const sessionPath = dialogflowClient.projectAgentSessionPath(
    process.env.GCP_ID!,
    message.author.id
  );

  const cleanMessage = removeMention(message.content);

  const request = {
    session: sessionPath,
    queryInput: {
      text: {
        text: cleanMessage,
        languageCode: "en-US",
      },
    },
  };

  try {
    const [intentInfo] = await dialogflowClient.detectIntent(request);
    const result = intentInfo.queryResult;
    if (!result?.fulfillmentText) {
      throw Error("No response from Dialogflow.");
    }

    response.reply = result.fulfillmentText;

    // Add args if intent complete
    if (
      result.allRequiredParamsPresent &&
      result.parameters?.fields &&
      result.intent?.displayName &&
      result.intent?.displayName !== "Default Fallback Intent"
    ) {
      response.commandName = result.intent.displayName;
      response.args = Object.entries(result.parameters.fields).reduce(
        (acc, [key, value]) => ({
          ...acc,
          [key]: value.stringValue ?? value.numberValue?.toString() ?? "",
        }),
        {}
      );
    }
    log(
      `requested from Dialogflow -- Message: ${cleanMessage}${
        result.intent?.displayName
          ? ", Intent: " + result.intent?.displayName
          : ""
      }, Response: ${result.fulfillmentText}`,
      message.author?.username
    );
  } catch (error) {
    logError(error);
  }

  return response;
}

function removeMention(messageContent: string): string {
  return messageContent.replace(/<(.+?)>/, "").trim();
}
