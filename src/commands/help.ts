import { ArgsMap, Command, Reply } from "@/utils/command";
import { Message, MessageEmbed } from "discord.js";

async function execute(args: ArgsMap, message: Message): Promise<Reply> {
  const reply = new MessageEmbed();
  return "void";
}

const help: Command = {
  dm: false,
  admin: false,
  execute,
};

export default help;
