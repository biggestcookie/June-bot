import {
  APIApplicationCommandPermission,
  RESTPostAPIApplicationCommandsJSONBody,
} from "discord-api-types/v9";
import { CommandInteraction } from "discord.js";
import { pingCommand } from "../commands/ping";

export interface Command {
  commandInfo: RESTPostAPIApplicationCommandsJSONBody;
  permissions?: APIApplicationCommandPermission;
  execute: (interaction: CommandInteraction) => Promise<void>;
}

export const commands: Record<string, Command> = {
  [pingCommand.commandInfo.name]: pingCommand,
};
