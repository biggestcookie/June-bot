import { Client, ClientOptions, ClientEvents } from "discord.js";
import { readdir } from "fs";

export class Bot {
  public client: Client;

  constructor(clientOptions?: ClientOptions) {
    this.client = new Client(clientOptions);
  }

  public async start() {
    await this.startEventListeners();
    this.client.login(process.env.DISCORD_TOKEN);
  }

  private async startEventListeners() {
    readdir(`${__dirname}/events`, (error, eventFiles) => {
      if (error) throw error;
      eventFiles.forEach(event => {});
    });
  }
}
