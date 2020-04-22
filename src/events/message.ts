import { App } from "@/app";
import { Message, User } from "discord.js";
import config from "@/options/config.json";
import { attemptExecuteCommand } from "@/utils/command";
import { requestFromDialogflow } from "@/api/dialogflow";

export async function run(app: App, message: Message) {
  const isChatCommand = message.cleanContent.startsWith(config.prefix);
  const isForDialogflow =
    message.mentions.has(app.client.user as User) ||
    message.channel.type === "dm";
  const isByBot = message.author.id === app.client.user.id;

  let commandName: string | undefined;
  let reply: string;
  let args: any;

  if (isChatCommand && !isByBot) {
    commandName = message.cleanContent.split(config.prefix).pop();
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

  await message.channel.send(reply);
  message.channel.stopTyping();
}
