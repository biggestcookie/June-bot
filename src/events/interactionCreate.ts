import { CacheType, Interaction } from "discord.js";
import { commands } from "../commands";
import { log } from "../utils/logger";

export async function onInteractionCreate(interaction: Interaction<CacheType>) {
  if (!interaction.isCommand()) {
    return;
  }
  const command = commands[interaction.commandName];
  await command?.execute(interaction);
  log(
    `executed command: ${command?.commandInfo.name}`,
    interaction.user.username
  );
}
