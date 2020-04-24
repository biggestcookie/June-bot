import { Client, ClientEvents, ClientOptions } from "discord.js";
import { readdir } from "fs";
import { Command, buildHelpText } from "./utils/command";

export class App {
  public client: Client;
  commands = new Map<string, Command>();

  constructor(clientOptions?: ClientOptions) {
    this.client = new Client(clientOptions);
  }

  public async start() {
    await this.startEventListeners();
    await this.assignAllCommands();
    this.client.login(process.env.DISCORD_TOKEN);
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
