import "module-alias/register";
import config from "@/options/config.json";
import { ClientOptions } from "discord.js";
import { Bot } from "./bot";

const options: ClientOptions = {
  presence: {
    activity: {
      type: "WATCHING",
      name: config.status,
    },
  },
};

async function init(options: ClientOptions): Promise<void> {
  try {
    const bot = new Bot(options);
    await bot.start();
  } catch (err) {
    console.log(err);
  }
}

init(options);
