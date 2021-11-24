import { MessageReaction } from "discord.js";

export async function fetchCachedReaction(
  messageReaction: MessageReaction
): Promise<MessageReaction> {
  if (messageReaction.partial) {
    try {
      console.log("Fetching partial reaction.");
      return messageReaction.fetch();
    } catch (e) {
      console.log(e);
    }
  } else {
    return Promise.resolve(messageReaction);
  }
}
