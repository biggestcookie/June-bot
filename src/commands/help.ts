import { App } from "@/app";
import config from "@/config.json";
import { ArgsMap } from "@/utils/command";
import { Message, MessageEmbed } from "discord.js";

export async function execute(
  args: ArgsMap,
  message: Message,
): Promise<MessageEmbed> {
  const commandName = args.get(0) ?? args.get("commandName");
  if (commandName) {
    return getCommandHelp(commandName);
  }
  let commandList = Array.from(App.commands, ([key, value]) => ({
    name: key,
    ...value,
  }));

  if (message.channel.type === "dm") {
    commandList = commandList.filter(
      (command) => (config.commands as any)[command.name]["dm"],
    );
  }

  if (!message.member?.hasPermission(["ADMINISTRATOR"])) {
    commandList = commandList.filter(
      (command) => !(config.commands as any)[command.name]["admin"],
    );
  }

  const commandNameList = commandList.map((command) => command.name);
  const reply = new MessageEmbed({
    title: "Commands",
    description: `Available commands: ${commandNameList.join(", ")}
    
    **Usage:** ${config.prefix}${config.commands.help.usage}
    *or:* ${config.mention} ${config.commands.help.dfUsage}
    `,
    color: "#ffacac",
  });
  return reply;
}

function getCommandHelp(commandName: string): MessageEmbed {
  const commandConfig = (config.commands as any)[commandName];
  const dfUsage = commandConfig["dfUsage"]
    ? `*or:* ${config.mention} ${commandConfig["dfUsage"]}`
    : `*${config.text.docs.noDialogflow}*`;
  const guildOnly = !commandConfig["dm"]
    ? `*${config.text.docs.guildOnly}*`
    : "";
  const adminOnly = commandConfig["admin"]
    ? `*${config.text.docs.adminOnly}*`
    : "";

  return new MessageEmbed({
    title: `${config.prefix}${commandName}`,
    description: `
      ${commandConfig["desc"]}


      **Usage:** ${config.prefix}${commandConfig["usage"]}
      ${dfUsage}
      
      ${guildOnly}
      ${adminOnly}
    `,
    color: "#ffacac",
  });
}
