import { App } from "@/app";
import config from "@/options/config.json";
import { Message } from "discord.js";

export interface HelpText {
  aliases: string[];
  desc: string;
  usage: string;
}

export interface Command {
  dm: boolean;
  help?: HelpText;
  run: (app: App, message: Message, args?: string[]) => Promise<void>;
}

export function buildHelpText(commandName: string): HelpText {
  return {
    aliases: (config.commands as any)[commandName]["aliases"],
    desc: (config.commands as any)[commandName]["desc"],
    usage: (config.commands as any)[commandName]["usage"]
  };
}
