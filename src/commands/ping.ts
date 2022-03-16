import { Command } from ".";

export const pingCommand: Command = {
  commandInfo: {
    name: "ping",
    description: "Replies 'pong'.",
  },
  execute: async (interaction) => {
    await interaction.reply("pong");
  },
};
