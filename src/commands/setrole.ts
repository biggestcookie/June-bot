import { App } from "@/app";
import { Message } from "discord.js";
import { Command } from "@/utils/command";

async function setRole(
  app: App,
  message: Message,
  role: string
): Promise<string> {
  return role;
}

const role: Command = {
  dm: false,
  run: setRole
};

export default role;
