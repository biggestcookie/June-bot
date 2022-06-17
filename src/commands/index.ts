import {
  APIApplicationCommandPermission,
  RESTPostAPIApplicationCommandsJSONBody,
} from "discord-api-types/v10";
import { CommandInteraction, Message } from "discord.js";
import { pingCommand } from "../commands/ping";
import { chatCommand } from "./chat";

export interface SlashCommand {
  commandInfo: RESTPostAPIApplicationCommandsJSONBody;
  permissions?: APIApplicationCommandPermission;
  executeSlashCommand: (
    interaction: CommandInteraction,
    ...args: any
  ) => Promise<void>;
}

export interface DialogflowCommand {
  dialogflowEnabled: true;
  executeDialogflowCommand: (message: Message, ...args: any) => Promise<void>;
}

export type CombinedCommand = DialogflowCommand & SlashCommand;

export const commands: Record<
  string,
  SlashCommand | DialogflowCommand | CombinedCommand
> = {
  [pingCommand.commandInfo.name]: pingCommand,
  [chatCommand.commandInfo.name]: chatCommand,
};

export function isInteraction(source: CommandInteraction | Message): boolean {
  return !!(source as CommandInteraction).commandId;
}
