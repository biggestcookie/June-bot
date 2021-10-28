import "module-alias/register";
import config from "@/config.json";
import { ClientOptions } from "discord.js";
import * as dotenv from "dotenv";
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
    dotenv.config({
      path: process.env.NODE_ENV === "production" ? "./.env" : "./.env_dev",
    });
    const app = new App(options);
    await app.start();
  } catch (err) {
    console.log(err);
  }
}

init();
