import { MessageReaction, User } from "discord.js";
import { fetchPartial } from "../utils/fetchPartial";
import { log } from "../utils/logger";

export async function onMessageReactionRemove(
  messageReaction: MessageReaction,
  reactionUser: User
) {
  messageReaction = await fetchPartial(messageReaction);
  switch (messageReaction.emoji.name) {
    case "📌":
      unpinMessage(messageReaction, reactionUser);
      break;
    default:
      break;
  }
}

async function unpinMessage(
  messageReaction: MessageReaction,
  reactionUser: User
) {
  await messageReaction.message.unpin();
  log(
    `unpinned message: ${messageReaction.message.cleanContent}`,
    reactionUser.username
  );
}
