import "./utils/dotenv";
import axios from "axios";
import {
  APIApplicationCommandPermission,
  RESTPutAPIApplicationCommandsJSONBody,
  RESTPutAPIApplicationCommandsResult,
  RESTPutAPIGuildApplicationCommandsPermissionsJSONBody,
  Routes,
} from "discord-api-types/v9";
import { performance } from "perf_hooks";
import { commands } from "./commands";
import { log } from "./utils/logger";

const startTime = performance.now();
const baseURL = "https://discord.com/api/v9";

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
        default_permission: false,
      });
    } else if ("commandInfo" in command) {
      commandInfosBody.push(command.commandInfo);
    }
  }

  // Send command info to Discord
  const commandInfoCreateResponse: RESTPutAPIApplicationCommandsResult = (
    await axiosInstance.put(
      Routes.applicationGuildCommands(
        process.env.DISCORD_CLIENT!,
        process.env.DISCORD_GUILD!
      ),
      commandInfosBody
    )
  ).data;

  if (commandPerms.size < 1) {
    return;
  }

  // Use returned command info IDs to build command permissions info
  const commandPermsBody: RESTPutAPIGuildApplicationCommandsPermissionsJSONBody =
    [...commandPerms].map(([commandName, commandPerm]) => ({
      id:
        commandInfoCreateResponse.find(
          (command) => command.name === commandName
        )?.id ?? "",
      permissions: [commandPerm],
    }));

  // Send command permissions info
  await axiosInstance.put(
    Routes.guildApplicationCommandsPermissions(
      process.env.DISCORD_CLIENT!,
      process.env.DISCORD_GUILD!
    ),
    commandPermsBody
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
