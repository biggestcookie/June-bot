import { MessageReaction, User } from "discord.js";
import { fetchPartial } from "../utils/fetchPartial";
import { log } from "../utils/logger";

export async function onMessageReactionAdd(
  messageReaction: MessageReaction,
  reactionUser: User
) {
  messageReaction = await fetchPartial(messageReaction);
  switch (messageReaction.emoji.name) {
    case "📌":
      pinMessage(messageReaction);
      log(
        `pinned message: ${messageReaction.message.cleanContent}`,
        reactionUser.username
      );
      break;
    default:
      break;
  }
}

async function pinMessage(messageReaction: MessageReaction) {
  if (!messageReaction.message.pinnable) {
    return;
  }

  await messageReaction.message.pin();

  setTimeout(async () => {
    const fetchedMessages =
      await messageReaction.message.channel.messages.fetch({
        limit: 10,
      });

    const foundMessage = fetchedMessages.find(
      (message) =>
        message.author.id === process.env.DISCORD_CLIENT &&
        message.type === "CHANNEL_PINNED_MESSAGE"
    );

    await foundMessage?.delete();
  }, 3000);
}
