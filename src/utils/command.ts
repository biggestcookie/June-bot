import { App } from "@/app";
import config from "@/config.json";
import { Message, MessageEmbed } from "discord.js";

export type ArgsMap = Map<number | string, string>;
export type Reply = string | MessageEmbed;

export interface Command {
  dm: boolean;
  admin: boolean;
  execute: (args?: ArgsMap, message?: Message) => Promise<Reply | Reply[]>;
}

export async function attemptExecuteCommand(
  commandName: string,
  args?: ArgsMap,
  message?: Message
): Promise<Reply | Reply[]> {
  try {
    const command = App.commands.get(commandName);
    if (!command.dm && message.channel.type === "dm") {
      return config.text.error.dm;
    } else if (
      command.admin &&
      !message.member.hasPermission(["ADMINISTRATOR"])
    ) {
      return config.text.error.admin;
    }
    return await command.execute(args, message);
  } catch (error) {
    console.log(error);
    if (error instanceof TypeError) {
      return config.text.error.not_found;
    }
    return config.text.error.internal;
  }
}
