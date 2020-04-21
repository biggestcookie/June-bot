import { Client, ClientOptions } from "discord.js";
import config from "@/options/config.json";

export class Bot {
  public client: Client;

  constructor(clientOptions?: ClientOptions) {
    this.client = new Client(clientOptions);
  }

  public async start(): Promise<void> {
    this.client.once("ready", () => {
      console.log(config.console.ready);
    });
    this.client.login(process.env.DISCORD);
  }
}
