import { fetchCachedReaction } from "@/utils/fetchCachedReaction";
import { MessageReaction, User } from "discord.js";

export async function execute(messageReaction: MessageReaction, _: User) {
  messageReaction = await fetchCachedReaction(messageReaction);
  if (
    messageReaction.message.pinned ||
    !messageReaction.message.pinnable ||
    messageReaction.emoji.name !== "📌"
  ) {
    return;
  }
  console.log("Pinning message: " + messageReaction.message.cleanContent);
  await messageReaction.message.pin();
}
