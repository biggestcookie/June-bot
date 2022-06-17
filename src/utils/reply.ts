import { CommandInteraction, InteractionReplyOptions } from "discord.js";

export type Reply = string | InteractionReplyOptions;

export async function sendInteractionFollowUps(
  interaction: CommandInteraction,
  replies: Reply[]
) {
  if (replies instanceof Array) {
    for (const reply of replies) {
      await interaction.followUp(reply);
    }
  }
}
