import { fetchCachedReaction } from "@/utils/fetchCachedReaction";
import { MessageReaction, User } from "discord.js";

export async function execute(messageReaction: MessageReaction, _: User) {
  fetchCachedReaction(messageReaction);
  if (
    messageReaction.message.pinned ||
    !messageReaction.message.pinnable ||
    messageReaction.emoji.name !== "📌"
  ) {
    return;
  }
  await messageReaction.message.pin();
}
