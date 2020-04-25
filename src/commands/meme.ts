import { getRandomTopPostsFromSub } from "@/api/reddit";
import { App } from "@/app";
import { ArgsMap, Command, Reply } from "@/utils/command";
import { getRandomElement } from "@/utils/utils";

async function sendMeme(app: App, args?: ArgsMap): Promise<Reply | Reply[]> {
  let quantity = parseInt(args.get(0) ?? args.get("quantity")) || 1;
  quantity = quantity = Math.min(quantity, 5);

  const sub = getRandomElement([
    "animemes",
    "wholesomeanimemes",
    "wholesomememes"
  ]);

  const embedMessage = await getRandomTopPostsFromSub(sub, quantity);
  return embedMessage.length > 1 ? embedMessage : embedMessage[0];
}

const meme: Command = {
  dm: true,
  run: sendMeme
};

export default meme;
