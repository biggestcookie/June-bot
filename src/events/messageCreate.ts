import { ClientEvents, Message, TextBasedChannel, User } from "discord.js";
import { getFromDialogFlow } from "../api/dialogflow";
import { client } from "../app";
import { commands, Reply } from "../commands";
import { log } from "../utils/logger";

export async function onMessageCreate(message: Message) {
  const isMentionsJune =
    (!message.mentions.everyone && message.mentions.has(client.user as User)) ||
    message.channel.type === "DM";

  if (
    !isMentionsJune ||
    !message.channel.isText() ||
    message.author.id === client.user?.id
  ) {
    return;
  }

  const {
    reply: initialReply,
    commandName,
    args,
  } = await getFromDialogFlow(message);
  const command = commands[commandName as keyof ClientEvents];

  if (initialReply) {
    await message.channel.send(initialReply);
  }

  if (command) {
    await message.channel.sendTyping();
    const replies = await command.execute(message, args);
    if (replies) {
      await sendMessageReplies(replies, message.channel);
    }
    log(
      `executed command as Dialogflow message: ${command?.commandInfo.name}`,
      message.author?.username
    );
  }
}

async function sendMessageReplies(
  replies: Reply | Reply[],
  channel: TextBasedChannel
) {
  if (replies instanceof Array) {
    for (const reply of replies) {
      await channel.send(reply);
    }
  } else {
    await channel.send(replies);
  }
}
