import { getRandomTopPostsFromSubs } from "@/api/reddit";
import { ArgsMap, Command, Reply } from "@/utils/command";

async function sendMeme(args?: ArgsMap): Promise<Reply | Reply[]> {
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
  run: sendMeme,
};

export default meme;
