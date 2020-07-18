import { getRandomTopPostsFromSubs } from "@/api/reddit";
import { ArgsMap, Command } from "@/utils/command";
import { MessageEmbed } from "discord.js";

async function execute(args?: ArgsMap): Promise<MessageEmbed | MessageEmbed[]> {
  let quantity = parseInt(args.get(0) ?? args.get("quantity")) || 1;
  const isWholesome = args.get("isWholesome") === "true" || false;
  quantity = quantity = Math.min(quantity, 5);

  const subs = [
    "animemes",
    "wholesomeanimemes",
    "wholesomememes",
    "programmeranimemes",
  ];

  const wholesomeSubs = subs.filter((sub) => sub.includes("wholesome"));

  const embedMessage = await getRandomTopPostsFromSubs(
    isWholesome ? wholesomeSubs : subs,
    quantity
  );
  return embedMessage.length > 1 ? embedMessage : embedMessage[0];
}

const meme: Command = {
  dm: true,
  admin: false,
  execute,
};

export default meme;
