import { Client, User } from "discord.js";
import { scheduleJob } from "node-schedule";
import config from "../config.json";
import { randomElement } from "../utils/random";

export async function startFlaskRoutine(client: Client) {
  const flaskUser = await client.users.fetch(process.env.FLASK_ID!);
  scheduleJob("0 10 * * *", async () => await messageFlask(flaskUser));
  scheduleJob("0 20 * * *", async () => await messageFlask(flaskUser));
}

async function messageFlask(flaskUser: User) {
  try {
    const messageText = randomElement(config.text.flask);
    flaskUser.send(messageText);
    console.log(`Sent flask reminder: ${messageText}`);
  } catch (error) {
    console.error(error);
  }
}
