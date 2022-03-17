import { CacheType, CommandInteraction, Interaction } from "discord.js";
import { commands, Reply } from "../commands";
import { log } from "../utils/logger";

export async function onInteractionCreate(interaction: Interaction<CacheType>) {
  if (!interaction.isCommand()) {
    return;
  }
  const command = commands[interaction.commandName];
  const replies = await command?.execute(interaction);
  await sendInteractionReplies(interaction, replies);
  log(
    `executed command as interaction: ${command?.commandInfo.name}`,
    interaction.user.username
  );
}

async function sendInteractionReplies(
  interaction: CommandInteraction,
  replies: Reply | Reply[]
) {
  if (replies instanceof Array) {
    const [initialReply, ...followUpReplies] = replies;
    await interaction.reply(initialReply);
    for (const reply of followUpReplies) {
      await interaction.followUp(reply);
    }
  } else {
    await interaction.reply(replies);
  }
}
