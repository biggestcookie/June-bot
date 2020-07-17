import { App } from "@/app";
import config from "@/config.json";
import { Message, MessageEmbed } from "discord.js";

export interface HelpText {
  aliases: string[];
  desc: string;
  usage: string;
}

export type ArgsMap = Map<number | string, string>;
export type Reply = string | MessageEmbed;

export interface Command {
  dm: boolean;
  admin: boolean;
  help?: HelpText;
  run: (args?: ArgsMap, message?: Message) => Promise<Reply | Reply[]>;
}

export function buildHelpText(commandName: string): HelpText {
  return {
    aliases: (config.commands as any)[commandName]["aliases"],
    desc: (config.commands as any)[commandName]["desc"],
    usage: (config.commands as any)[commandName]["usage"],
  };
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
    }
    return await command.run(args);
  } catch (error) {
    console.log(error);
    if (error instanceof TypeError) {
      return config.text.error.not_found;
    } else {
      return config.text.error.internal;
    }
  }
}
