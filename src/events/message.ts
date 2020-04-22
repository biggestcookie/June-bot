import { Bot } from "@/bot";
import { Message } from "discord.js";

export async function run(bot: Bot, message: Message) {
  const role = bot.commands.get("role");
  role?.run(bot, message);
  console.log(`received message: ${message}`);
}
