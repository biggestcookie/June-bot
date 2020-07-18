import { App } from "@/app";
import config from "@/config.json";
import { ArgsMap } from "@/utils/command";
import { Message, MessageEmbed } from "discord.js";

const commandConfigLower: any = Object.fromEntries(
  Object.entries(config.commands).map(([key, value]) => [
    key.toLowerCase(),
    value,
  ])
);

export async function execute(
  args: ArgsMap,
  message: Message
): Promise<MessageEmbed> {
  const commandName = args.get(0) ?? args.get("commandname");
  if (commandName) {
    return getCommandHelp(commandName);
  }
  const commandList = Array.from(App.commands, ([key, value]) => ({
    name: key,
    ...value,
  }));

  if (!message.member.hasPermission(["ADMINISTRATOR"])) {
    commandList.filter((command) => !commandConfigLower[command.name]["admin"]);
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
  const dfUsage = commandConfigLower[commandName]["dfUsage"]
    ? `*or:* ${config.mention} ${commandConfigLower[commandName]["dfUsage"]}`
    : `*${config.text.docs.noDialogflow}*`;
  const guildOnly = !!commandConfigLower[commandName]["dm"]
    ? "*" + config.text.docs.guildOnly + "*"
    : "";

  return new MessageEmbed({
    title: `${config.prefix}${commandName}`,
    description: `
      ${commandConfigLower[commandName]["desc"]}


      **Usage:** ${config.prefix}${commandConfigLower[commandName]["usage"]}

      ${dfUsage}
      ${guildOnly}
    `,
    color: "#ffacac",
  });
}
