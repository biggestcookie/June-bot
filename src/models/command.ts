import {
  APIApplicationCommandPermission,
  RESTPostAPIApplicationCommandsJSONBody,
} from "discord-api-types";
import { CommandInteraction } from "discord.js";

export interface Command {
  commandInfo: RESTPostAPIApplicationCommandsJSONBody;
  permissions?: APIApplicationCommandPermission;
  execute: (interaction: CommandInteraction) => Promise<void>;
}
