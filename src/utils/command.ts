import { App } from "@/app";
import config from "@/config.json";
import { Message, MessageEmbed } from "discord.js";

export type ArgsMap = Map<number | string, string>;
export type Reply = string | MessageEmbed;

export type Command = (
  args?: ArgsMap,
  message?: Message
) => Promise<Reply | Reply[]>;

export async function attemptExecuteCommand(
  commandName: string,
  args?: ArgsMap,
  message?: Message
): Promise<Reply | Reply[]> {
  try {
    const command = App.commands.get(commandName);
    const commandConfig = (config.commands as any)[commandName];
    if (!commandConfig?.dm && message.channel.type === "dm") {
      return config.text.error.dm;
    } else if (
      commandConfig.admin &&
      !message.member?.hasPermission(["ADMINISTRATOR"])
    ) {
      return config.text.error.admin;
    } else if (commandConfig.argsRequired && !args?.size) {
      return await App.commands.get("help")(
        new Map(Object.entries({ commandName }))
      );
    }
    return await command(args, message);
  } catch (error) {
    console.log(error);
    return config.text.error.internal;
  }
}
