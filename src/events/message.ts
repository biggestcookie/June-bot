import { App } from "@/app";
import { Message, User } from "discord.js";
import config from "@/options/config.json";
import { attemptExecuteCommand, ArgsMap } from "@/utils/command";
import { requestFromDialogflow } from "@/api/dialogflow";

function parseMessageArgs(messageContent: string): ArgsMap {
  const argsList = messageContent.split(" ").splice(1);
  return argsList.reduce((argsMap, val, i) => argsMap.set(i, val), new Map());
}

export async function run(app: App, message: Message) {
  const isChatCommand = message.cleanContent.startsWith(config.prefix);
  const isForDialogflow =
    message.mentions.has(app.client.user as User) ||
    message.channel.type === "dm";
  const isByBot = message.author.id === app.client.user.id;

  let commandName: string | undefined;
  let reply: string | string[];
  let args: ArgsMap;

  if (isChatCommand && !isByBot) {
    commandName = message.cleanContent.split(config.prefix).pop();
    args = parseMessageArgs(message.cleanContent);
  } else if (isForDialogflow && !isByBot) {
    const response = await requestFromDialogflow(message);
    reply = response.reply;
    commandName = response.commandName;
    args = response.args;
  } else {
    return;
  }

  if (commandName) {
    message.channel.startTyping();
    reply = await attemptExecuteCommand(app, message, commandName, args);
  }

  if (reply instanceof Array) {
    Promise.all(reply.map(msg => message.channel.send(msg)));
  } else {
    await message.channel.send(reply);
  }
  message.channel.stopTyping();
}
