import { Client, ClientOptions, Intents } from "discord.js";
import config from "./config.json";
import { events } from "./events";
import { startFlaskRoutine } from "./routines/flask";
import "./utils/dotenv";

const clientOptions: ClientOptions = {
  partials: ["MESSAGE", "CHANNEL", "REACTION"],
  intents: [
    Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
    Intents.FLAGS.GUILD_MESSAGES,
  ],
  presence: {
    status: "online",
    activities: [
      {
        name: config.status,
        type: "LISTENING",
      },
    ],
  },
};

const client = new Client(clientOptions);

function startEventListeners() {
  for (const [eventName, eventMethod] of Object.entries(events)) {
    client.on(eventName, async (...args) => {
      try {
        await eventMethod(...args);
      } catch (error) {
        console.error(error);
      }
    });
  }
  console.log(config.console.events);
}

function startRoutines() {
  startFlaskRoutine(client);
  console.log(config.console.routines);
}

startEventListeners();
startRoutines();

client.once("ready", () => {
  console.log("App running.");
});

client.login(process.env.DISCORD_TOKEN);
