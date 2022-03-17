import { CommandInteraction, Message } from "discord.js";
import { isInteraction, SlashCommand } from ".";
import config from "../config.json";

export const juneCommand: SlashCommand = {
  commandInfo: {
    name: "june",
    description: "Starts a thread for chatting with June.",
  },
  executeSlashCommand: async (source: CommandInteraction) => {
    if (source.channel?.type !== "GUILD_TEXT" || !isInteraction(source)) {
      source.reply({
        content: config.text.error.channel,
        ephemeral: true,
      });
      return;
    }

    const reply = (await source.reply({
      content: ":thread:",
      fetchReply: true,
    })) as Message<boolean>;

    const dateString = new Date()
      .toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })
      .toLowerCase();

    await reply.startThread({
      name: `chat with june! - ${dateString}`,
      autoArchiveDuration: 60,
    });
  },
};
