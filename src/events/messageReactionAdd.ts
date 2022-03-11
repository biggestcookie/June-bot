import { MessageReaction, User } from "discord.js";
import { fetchPartial } from "../utils/fetchPartial";

export async function onMessageReactionAdd(
  messageReaction: MessageReaction,
  reactionUser: User
) {
  messageReaction = await fetchPartial(messageReaction);
  switch (messageReaction.emoji.name) {
    case "📌":
      pinMessage(messageReaction, reactionUser);
      break;
    default:
      break;
  }
}

async function pinMessage(
  messageReaction: MessageReaction,
  reactionUser: User
) {
  if (!messageReaction.message.pinnable) {
    return;
  }

  await messageReaction.message.pin();
  console.log(
    `${new Date().toLocaleString()} - ${
      reactionUser.username
    } pinned message: ${messageReaction.message.cleanContent}`
  );

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
