import {
  CommandInteraction,
  InteractionReplyOptions,
  TextBasedChannel,
} from "discord.js";

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

export async function sendMessageReplies(
  replies: Reply | Reply[],
  channel: TextBasedChannel
) {
  if (replies instanceof Array) {
    for (const reply of replies) {
      await channel.send(reply);
    }
  } else {
    await channel.send(replies);
  }
}
