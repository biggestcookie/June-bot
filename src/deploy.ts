import axios from "axios";
import {
  APIApplicationCommandPermission,
  RESTPutAPIApplicationCommandsJSONBody,
  RESTPutAPIApplicationCommandsResult,
  RESTPutAPIGuildApplicationCommandsPermissionsJSONBody,
  Routes,
} from "discord-api-types/v9";
import { commands } from "./commands";
import "./utils/dotenv";

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
    if (command.permissions) {
      commandPerms.set(commandName, command.permissions);
      commandInfosBody.push({
        ...command.commandInfo,
        default_permission: false,
      });
    } else {
      commandInfosBody.push(command.commandInfo);
    }
  }

  try {
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
    console.log("Registered guild commands.");
  } catch (error) {
    console.error(error);
  }
}

deployCommands();
