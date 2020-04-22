import { Bot } from "@/bot";
import { Message } from "discord.js";

export interface HelpText {
  aliases: string[];
  desc: string;
  usage: string;
}

export interface Command {
  help?: HelpText;
  dm?: boolean;
  run: (bot: Bot, message: Message, args?: string[]) => void;
}
