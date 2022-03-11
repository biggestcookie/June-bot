import { CacheType, Interaction } from "discord.js";
import { commands } from "../commands";

export async function onInteractionCreate(interaction: Interaction<CacheType>) {
  if (!interaction.isCommand()) {
    return;
  }
  const command = commands[interaction.commandName];
  await command?.execute(interaction);
  console.log(
    `${new Date().toLocaleString()} - Command executed: ${
      command?.commandInfo.name
    }`
  );
}
