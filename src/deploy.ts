import axios from "axios";
import {
  APIApplicationCommandPermission,
  RESTPutAPIApplicationCommandsJSONBody,
  RESTPutAPIApplicationCommandsResult,
  RESTPutAPIGuildApplicationCommandsPermissionsJSONBody,
  Routes,
} from "discord-api-types/v9";
import { readdir } from "fs/promises";
import { Command } from "./models/command";
import "./utils/dotenv";

const baseURL = "https://discord.com/api/v9";

const axiosInstance = axios.create({
  baseURL,
  timeout: 10000,
  headers: {
    Authorization: `Bot ${process.env.DISCORD_TOKEN?.trim()}`,
  },
});

const commandInfosBody: RESTPutAPIApplicationCommandsJSONBody = [];
const commandPerms = new Map<string, APIApplicationCommandPermission>();

async function importCommandInfos() {
  const commandFiles = await readdir(`${process.cwd()}/dist/commands`);

  for (const commandFile of commandFiles) {
    const command = (
      await import(`${process.cwd()}/dist/commands/${commandFile}`)
    ).default as Command;

    if (command.permissions) {
      commandPerms.set(command.commandInfo.name, command.permissions);
      commandInfosBody.push({
        ...command.commandInfo,
        default_permission: false,
      });
    } else {
      commandInfosBody.push(command.commandInfo);
    }
  }
}

async function deployCommands() {
  await importCommandInfos();
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
      [];
    commandPerms.forEach((commandPerm, commandName) => {
      commandPermsBody.push({
        id:
          commandInfoCreateResponse.find(
            (command) => command.name === commandName
          )?.id ?? "",
        permissions: [commandPerm],
      });
    });

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
