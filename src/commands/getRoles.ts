import config from "@/config.json";
import { Command } from "@/utils/command";
import { Message, MessageEmbed } from "discord.js";
import { getRepository } from "typeorm";
import { RoleEntity } from "@/entities/role";

async function execute(_: any, message: Message): Promise<MessageEmbed> {
  const roleEntities = await getRepository(RoleEntity).find({
    where: {
      guild: message.guild.id,
    },
  });
  const roleNames = roleEntities.map((role) => role.roleName);
  const reply = new MessageEmbed({
    title: "Roles",
    description: roleNames.join(", "),
    fields: [
      {
        name: config.whitespace,
        value: `Assign a role with ${config.prefix}addrole or by asking me with a @mention`,
      },
    ],
    hexColor: "#ffacac",
  });
  return reply;
}

const getRoles: Command = {
  dm: false,
  admin: false,
  execute,
};

export default getRoles;
