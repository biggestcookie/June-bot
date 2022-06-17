import "./utils/dotenv";
import axios from "axios";
import {
  APIApplicationCommandPermission,
  RESTPutAPIApplicationCommandsJSONBody,
  Routes,
} from "discord-api-types/v10";
import { performance } from "perf_hooks";
import { commands } from "./commands";
import { log } from "./utils/logger";

const startTime = performance.now();
const baseURL = "https://discord.com/api/v10";

const axiosInstance = axios.create({
  baseURL,
  timeout: 10000,
  headers: {
    Authorization: `Bot ${process.env.DISCORD_TOKEN?.trim()}`,
  },
});

export async function deployCommands() {
  const commandInfosBody: RESTPutAPIApplicationCommandsJSONBody = [];
  const commandPerms = new Map<string, APIApplicationCommandPermission>();

  for (const [commandName, command] of Object.entries(commands)) {
    if ("permissions" in command && command.permissions) {
      commandPerms.set(commandName, command.permissions);
      commandInfosBody.push({
        ...command.commandInfo,
      });
    } else if ("commandInfo" in command) {
      commandInfosBody.push(command.commandInfo);
    }
  }

  // Send command info to Discord
  await axiosInstance.put(
    Routes.applicationCommands(process.env.DISCORD_CLIENT!),
    commandInfosBody
  );
}

deployCommands()
  .then(() =>
    log(
      `Registered guild commands in ${(
        (performance.now() - startTime) *
        1e-3
      ).toFixed(4)} seconds.`
    )
  )
  .catch(console.error);
