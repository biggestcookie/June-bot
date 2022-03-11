import { CacheType, Interaction } from "discord.js";
import pingCommand from "../commands/ping";
import { Command } from "../models/command";

const commandsMap = new Map<string, Command>([["ping", pingCommand]]);

export async function onInteractionCreate(interaction: Interaction<CacheType>) {
  if (!interaction.isCommand()) {
    return;
  }
  const command = commandsMap.get(interaction.commandName.toLowerCase());
  await command?.execute(interaction);
  console.log(
    `${new Date().toLocaleString()} - Command executed: ${
      command?.commandInfo.name
    }`
  );
}
