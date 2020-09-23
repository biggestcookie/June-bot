import config from "@/config.json";
import { RoleEntity } from "@/entities/role";
import { Message, MessageEmbed } from "discord.js";
import { getRepository } from "typeorm";

export async function execute(_: any, message: Message): Promise<MessageEmbed> {
  const roleEntities = await getRepository(RoleEntity).find({
    where: {
      guild: message.guild.id,
    },
  });
  const roleNames = roleEntities.map((role) => role.roleName);
  const reply = new MessageEmbed({
    title: "Roles",
    description: roleNames.length
      ? roleNames.join(", ")
      : config.commands.getroles.noRoles,
    fields: [
      {
        name: config.whitespace,
        value: `Assign a role with ${config.prefix}setrole or by asking me with a @mention`,
      },
    ],
    hexColor: "#ffacac",
  });
  return reply;
}
