import { MessageReaction, User } from "discord.js";
import { fetchPartial } from "../utils/fetchPartial";

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
  console.log(
    `${new Date().toLocaleString()} - ${
      reactionUser.username
    } unpinned message: ${messageReaction.message.cleanContent}`
  );
}
