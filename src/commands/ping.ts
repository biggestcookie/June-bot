import { CommandInteraction, Message } from "discord.js";
import { CombinedCommand } from ".";

export const pingCommand: CombinedCommand = {
  commandInfo: {
    name: "ping",
    description: "Replies 'pong'.",
  },
  dialogflowEnabled: true,
  executeSlashCommand: async (interaction: CommandInteraction) => {
    interaction.reply("pong");
  },
  executeDialogflowCommand: async (message: Message) => {
    message.channel.send("pong");
  },
};
