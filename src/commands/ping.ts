import { Command } from "../models/command";

export const pingCommand: Command = {
  commandInfo: {
    name: "ping",
    description: "Replies 'pong'.",
  },
  execute: async (interaction) => {
    await interaction.reply("pong");
  },
};
