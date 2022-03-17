import {
  APIApplicationCommandPermission,
  RESTPostAPIApplicationCommandsJSONBody,
} from "discord-api-types/v9";
import { CommandInteraction, Message, MessagePayload } from "discord.js";
import { pingCommand } from "../commands/ping";

export type Reply = string | MessagePayload;

export interface Command {
  commandInfo: RESTPostAPIApplicationCommandsJSONBody;
  permissions?: APIApplicationCommandPermission;
  execute: (
    source: CommandInteraction | Message,
    ...args: any
  ) => Promise<Reply | Reply[]>;
}

export const commands: Record<string, Command> = {
  [pingCommand.commandInfo.name]: pingCommand,
};

export function isInteraction(source: CommandInteraction | Message): boolean {
  return !!(source as CommandInteraction).commandId;
}
