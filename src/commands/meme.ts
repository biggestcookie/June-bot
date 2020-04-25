import { App } from "@/app";
import { ArgsMap, Command, Reply } from "@/utils/command";
import { getRandomTopPostsFromSub } from "@/api/reddit";
import { MessageEmbed } from "discord.js";

async function sendMeme(app: App, args?: ArgsMap): Promise<Reply | Reply[]> {
  const sub = "animemes,wholesomeanimemes";
  const quantity = parseInt(args.get(0) ?? args.get("quantity")) || 1;
  const postLinks = await getRandomTopPostsFromSub(sub, quantity);
  const reply = new MessageEmbed();
  return postLinks.length > 1 ? postLinks : postLinks[0];
}

const meme: Command = {
  dm: true,
  run: sendMeme
};

export default meme;
