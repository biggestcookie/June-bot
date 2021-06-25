import { getRandomTopPostsFromSubs } from "@/api/reddit";
import { ArgsMap } from "@/utils/command";
import config from "@/config.json";
import { MessageEmbed } from "discord.js";

export async function execute(
  args?: ArgsMap,
): Promise<MessageEmbed | MessageEmbed[]> {
  let quantity = parseInt(args.get(0) ?? args.get("quantity")) || 1;
  const isWholesome = args.get("isWholesome") === "true" || false;
  quantity = quantity = Math.min(quantity, 5);

  const subs = config.commands.meme.subs;

  const wholesomeSubs = subs.filter((sub) => sub.includes("wholesome"));

  const embedMessage = await getRandomTopPostsFromSubs(
    isWholesome ? wholesomeSubs : subs,
    quantity,
  );
  return embedMessage.length > 1 ? embedMessage : embedMessage[0];
}
