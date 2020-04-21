import { Client, Message } from "discord.js";

export async function run(client: Client, message: Message) {
  console.log(`received message: ${message}`);
}
