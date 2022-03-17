import { ClientEvents, Message, User } from "discord.js";
import { getFromDialogFlow } from "../api/dialogflow";
import { client } from "../app";
import { commands } from "../commands";
import { log } from "../utils/logger";

export async function onMessageCreate(message: Message) {
  const isMentionsJune =
    (!message.mentions.everyone && message.mentions.has(client.user as User)) ||
    message.channel.type === "DM";

  const isInThread =
    message.channel.type === "GUILD_PUBLIC_THREAD" ||
    message.channel.type === "GUILD_PRIVATE_THREAD";

  const isBotThread = isInThread && message.channel.ownerId === client.user?.id;

  if (
    (!isMentionsJune && !isBotThread) ||
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

  if (command && "dialogflowEnabled" in command) {
    await message.channel.sendTyping();
    await command.executeDialogflowCommand(message, args);
    log(
      `executed command as Dialogflow message: ${commandName}`,
      message.author?.username
    );
  }
}
