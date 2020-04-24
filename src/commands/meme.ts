import { App } from "@/app";
import { ArgsMap, Command } from "@/utils/command";

async function sendMeme(app: App, args?: ArgsMap): Promise<string | string[]> {
  const quantity = args.get(0) ?? args.get("quantity") ?? 1;
  return quantity.toString();
}

const meme: Command = {
  dm: false,
  run: sendMeme
};

export default meme;
