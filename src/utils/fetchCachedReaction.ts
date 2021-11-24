import { MessageReaction } from "discord.js";

export async function fetchCachedReaction(messageReaction: MessageReaction) {
  if (messageReaction.partial) {
    try {
      await messageReaction.fetch();
    } catch (e) {
      console.log(e);
    }
  }
}
