import { ArgsMap, Command } from "@/utils/command";
import config from "@/config.json";

import { Message, MessageEmbed } from "discord.js";
import { App } from "@/app";

const configCommandsLowercase: any = Object.fromEntries(
  Object.entries(config.commands).map(([key, value]) => [
    key.toLowerCase(),
    value,
  ])
);

async function execute(args: ArgsMap, message: Message): Promise<MessageEmbed> {
  const commandName = args.get(0) ?? args.get("commandname");
  if (commandName) {
    return getCommandHelp(commandName);
  }

  const commandList = Array.from(App.commands, ([key, value]) => ({
    name: key,
    ...value,
  }));

  if (!message.member.hasPermission(["ADMINISTRATOR"])) {
    commandList.filter((command) => !command.admin);
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
  const dfUsage = configCommandsLowercase[commandName]["dfUsage"]
    ? `*or:* ${config.mention} ${configCommandsLowercase[commandName]["dfUsage"]}`
    : `*${config.text.docs.noDialogflow}*`;
  const guildOnly = !App.commands.get(commandName).dm
    ? "*" + config.text.docs.guildOnly + "*"
    : "";

  return new MessageEmbed({
    title: `${config.prefix}${commandName}`,
    description: `
      ${configCommandsLowercase[commandName]["desc"]}


      **Usage:** ${config.prefix}${configCommandsLowercase[commandName]["usage"]}

      ${dfUsage}
      ${guildOnly}
    `,
    hexColor: "#ffacac",
  });
}

const help: Command = {
  dm: true,
  admin: false,
  execute,
};

export default help;
