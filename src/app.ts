import { Client, ClientOptions, Intents } from "discord.js";
import { deployCommands } from "./deploy";
import { events } from "./events";
import "./utils/dotenv";

const clientOptions: ClientOptions = {
  partials: ["MESSAGE", "CHANNEL", "REACTION"],
  intents: [
    Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
    Intents.FLAGS.GUILD_MESSAGES,
  ],
};

const discordClient = new Client(clientOptions);

async function startEventListeners(client: Client) {
  for (const [eventName, eventMethod] of Object.entries(events)) {
    client.on(eventName, async (...args) => {
      try {
        await eventMethod(...args);
      } catch (error) {
        console.error(error);
      }
    });
  }
}

startEventListeners(discordClient);

if (process.env.NODE_ENV !== "production") {
  deployCommands();
}

discordClient.once("ready", () => {
  console.log("App running.");
});

discordClient.login(process.env.DISCORD_TOKEN);
