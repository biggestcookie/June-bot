import { App } from "@/app";
import config from "@/options/config.json";
import { Message, Collection } from "discord.js";

export interface HelpText {
  aliases: string[];
  desc: string;
  usage: string;
}

export interface Command {
  dm: boolean;
  help?: HelpText;
  run: (app: App, message: Message, ...args: string[]) => Promise<string>;
}

export function buildHelpText(commandName: string): HelpText {
  return {
    aliases: (config.commands as any)[commandName]["aliases"],
    desc: (config.commands as any)[commandName]["desc"],
    usage: (config.commands as any)[commandName]["usage"]
  };
}

export function findCommand(
  commandName: string,
  commands: Collection<string, Command>
): Command | undefined {
  return commands.get(commandName);
}

export async function attemptExecuteCommand(
  app: App,
  message: Message,
  commandName: string,
  args?: string[]
): Promise<string> {
  try {
    const command = findCommand(commandName, app.commands);
    return await command.run(app, message, ...args);
  } catch (error) {
    console.log(error);
    if (error instanceof TypeError) {
      return config.text.error.not_found;
    } else {
      return config.text.error.internal;
    }
  }
}
