import { Client, ClientEvents, ClientOptions } from "discord.js";
import { readdir } from "fs";
import { ConnectionOptions, createConnection } from "typeorm";
import { buildHelpText, Command } from "./utils/command";

export class App {
  public static client: Client;
  static commands = new Map<string, Command>();

  constructor(clientOptions?: ClientOptions) {
    App.client = new Client(clientOptions);
  }

  public async start() {
    await this.initDatabaseConnection();
    await this.startEventListeners();
    await this.assignAllCommands();
    App.client.login(process.env.DISCORD_TOKEN);
  }

  private async initDatabaseConnection() {
    await createConnection({
      type: process.env.DATABASE_TYPE,
      database: process.env.DATABASE_PATH,
      url: process.env.DATABASE_URL,
      entities: [`${__dirname}/models/*.js`],
    } as ConnectionOptions);
  }

  private async startEventListeners() {
    readdir(`${__dirname}/events`, async (error, eventFiles) => {
      if (error) throw error;
      for (const eventFile of eventFiles) {
        const eventName = eventFile.split(".")[0];
        const eventMethod = await import(`${__dirname}/events/${eventFile}`);

        App.client.on(eventName as keyof ClientEvents, async (...args) => {
          await eventMethod.run(...args);
        });
      }
    });
  }

  private async assignAllCommands() {
    readdir(`${__dirname}/commands`, async (error, commandFiles) => {
      if (error) throw error;
      for (const commandFile of commandFiles) {
        const commandName = commandFile.split(".")[0];
        const command: Command = await import(
          `${__dirname}/commands/${commandFile}`
        ).then((module) => module.default);

        command.help = buildHelpText(commandName);
        App.commands.set(commandName, command);
      }
    });
  }
}
