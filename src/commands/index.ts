import { pingCommand } from "../commands/ping";
import { Command } from "../models/command";

export const commands: Record<string, Command> = {
  [pingCommand.commandInfo.name]: pingCommand,
};
