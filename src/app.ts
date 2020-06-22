import { Client, ClientEvents, ClientOptions } from "discord.js";
import { readdir, readFile, readdirSync } from "fs";
import { ConnectionOptions, createConnection } from "typeorm";
import { buildHelpText, Command } from "./utils/command";

export class App {
  public client: Client;
  commands = new Map<string, Command>();

  constructor(clientOptions?: ClientOptions) {
    this.client = new Client(clientOptions);
  }

  public async start() {
    await this.initDatabaseConnection();
    await this.startEventListeners();
    await this.assignAllCommands();
    this.client.login(process.env.DISCORD_TOKEN);
  }

  private async initDatabaseConnection() {
    await createConnection({
      type: process.env.DATABASE_TYPE,
      database: process.env.DATABASE_PATH,
      url: process.env.DATABASE_URL,
      entities: [`${__dirname}/models/*.js`]
    } as ConnectionOptions);
  }

  private async startEventListeners() {
    readdir(`${__dirname}/events`, async (error, eventFiles) => {
      if (error) throw error;
      for await (const eventFile of eventFiles) {
        const eventName = eventFile.split(".")[0];
        const eventMethod = await import(`${__dirname}/events/${eventFile}`);

        this.client.on(eventName as keyof ClientEvents, async (...args) => {
          await eventMethod.run(this, ...args);
        });
      }
    });
    // readdir(`${__dirname}/events`, async (error, eventFiles) => {
    //   if (error) throw error;
    //   const eventMethods = await Promise.all(
    //     eventFiles.map(eventFile => import(`${__dirname}/events/${eventFile}`))
    //   );
    //   eventMethods.map(eventMethod => {
    //     eventMethod.run();
    //   });
    // });
  }

  private async assignAllCommands() {
    readdir(`${__dirname}/commands`, async (error, commandFiles) => {
      if (error) throw error;
      for await (const commandFile of commandFiles) {
        const commandName = commandFile.split(".")[0];
        const command: Command = await import(
          `${__dirname}/commands/${commandFile}`
        ).then(module => module.default);

        command.help = buildHelpText(commandName);
        this.commands.set(commandName, command);
      }
    });
  }
}
