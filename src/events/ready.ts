import { Client } from "discord.js";
import config from "@/options/config.json";

export async function run(client: Client) {
  console.log(config.console.ready);
}
