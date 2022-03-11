import { Command } from "../models/command";

const command: Command = {
  commandInfo: {
    name: "ping",
    description: "Replies 'pong'.",
  },
  execute: async (interaction) => {
    await interaction.reply("pong");
  },
};

export default command;
