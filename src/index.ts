import "module-alias/register";
import config from "@/options/config.json";
import { ClientOptions } from "discord.js";
import { App } from "./app";

async function init() {
  const options: ClientOptions = {
    presence: {
      activity: {
        type: "WATCHING",
        name: config.status,
      },
    },
  };

  try {
    const app = new App(options);
    await app.start();
  } catch (err) {
    console.log(err);
  }
}

init();
