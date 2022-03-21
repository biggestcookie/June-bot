import { GuildTextBasedChannel } from "discord.js";
import { scheduleJob } from "node-schedule";
import { client } from "../app";
import { log, logError } from "../utils/logger";
import { solveWordle } from "../utils/wordle/solve";

export async function startWordleRoutine() {
  const wordleChannel = (await client.channels.fetch(
    process.env.DISCORD_WORDLE_CHANNEL!
  )) as GuildTextBasedChannel;
  scheduleJob("0 0 * * *", async () => await messageWordle(wordleChannel));
}

async function messageWordle(channel: GuildTextBasedChannel) {
  try {
    channel.send(solveWordle());
    log(`Routine: Wordle played`);
  } catch (error) {
    logError(error);
  }
}
