import { App } from "@/app";
import { Message } from "discord.js";
import { Command } from "@/utils/command";

async function setRole(app: App, message: Message, args?: string[]) {
  console.log("hi");
}

const role: Command = {
  dm: false,
  run: setRole
};

export default role;
