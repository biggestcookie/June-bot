import { ArgsMap, Reply } from "@/utils/command";
import { Message } from "discord.js";

export async function execute(args: ArgsMap, message: Message): Promise<Reply> {
  await message.delete();
  return [...args.values()].join(" ");
}
