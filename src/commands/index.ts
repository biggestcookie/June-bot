import {
  APIApplicationCommandPermission,
  RESTPostAPIApplicationCommandsJSONBody,
} from "discord-api-types/v9";
import { CommandInteraction, Message } from "discord.js";
import { pingCommand } from "../commands/ping";
import { juneCommand } from "./june";

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
  [juneCommand.commandInfo.name]: juneCommand,
};

export function isInteraction(source: CommandInteraction | Message): boolean {
  return !!(source as CommandInteraction).commandId;
}
