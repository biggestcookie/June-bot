import { App } from "@/app";
import { Message, User } from "discord.js";
import config from "@/options/config.json";
import { attemptExecuteCommand, ArgsMap, Reply } from "@/utils/command";
import { requestFromDialogflow } from "@/api/dialogflow";

function parseMessageArgs(args: string[]): ArgsMap {
  return args.reduce((argsMap, val, i) => argsMap.set(i, val), new Map());
}

export async function run(app: App, message: Message) {
  const isChatCommand = message.cleanContent.startsWith(config.prefix);
  const isForDialogflow =
    message.mentions.has(app.client.user as User) ||
    message.channel.type === "dm";
  const isByBot = message.author.id === app.client.user.id;

  let commandName: string | undefined;
  let args: ArgsMap;

  if (isChatCommand && !isByBot) {
    const splitMsgArr = message.cleanContent.split(" ");
    commandName = splitMsgArr[0].split(config.prefix).pop();
    args = parseMessageArgs(splitMsgArr.splice(1));
  } else if (isForDialogflow && !isByBot) {
    const response = await requestFromDialogflow(message);
    const initialReply = response.reply;

    commandName = response.commandName;
    args = response.args;
    if (commandName && initialReply) {
      await message.channel.send(initialReply);
    }
  } else {
    return;
  }

  message.channel.startTyping();
  const completeReply = await attemptExecuteCommand(
    app,
    message,
    commandName,
    args
  );
  message.channel.stopTyping();
  if (completeReply instanceof Array) {
    Promise.all(completeReply.map(msg => message.channel.send(msg)));
  } else {
    await message.channel.send(completeReply);
  }
}
