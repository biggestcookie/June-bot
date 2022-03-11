import { Client, ClientEvents, ClientOptions, Intents } from "discord.js";
import { onInteractionCreate } from "./events/interactionCreate";
import { onMessageReactionAdd } from "./events/messageReactionAdd";
import { onMessageReactionRemove } from "./events/messageReactionRemove";
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
  const events: Partial<
    Record<keyof ClientEvents, (...args: any) => Promise<void>>
  > = {
    interactionCreate: onInteractionCreate,
    messageReactionAdd: onMessageReactionAdd,
    messageReactionRemove: onMessageReactionRemove,
  };

  Object.entries(events).map(([eventName, eventMethod]) => {
    client.on(eventName, async (...args) => {
      try {
        await eventMethod(...args);
      } catch (error) {
        console.error(error);
      }
    });
  });
}

startEventListeners(discordClient);

discordClient.once("ready", () => {
  console.log("App running.");
});

discordClient.login(process.env.DISCORD_TOKEN);
