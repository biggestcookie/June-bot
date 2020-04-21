import { Client, ClientEvents, ClientOptions, Collection } from "discord.js";
import { readdir } from "fs";
import { Command } from "./utils/command";

export interface DiscordClient extends Client {
  commands: Collection<string, Command>;
}

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
    readdir(`${__dirname}/events`, async (error, eventFiles) => {
      if (error) throw error;
      for await (const eventFile of eventFiles) {
        const eventName = eventFile.split(".")[0];
        const eventMethod = await import(`${__dirname}/events/${eventFile}`);
        this.client.on(eventName as keyof ClientEvents, (...args) => {
          eventMethod.run(this.client, ...args);
        });
      }
    });
  }
}
