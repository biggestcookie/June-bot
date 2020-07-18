import { RoleEntity } from "@/entities/role";
import { Reply } from "@/utils/command";
import { Message, MessageEmbed } from "discord.js";
import { getRepository } from "typeorm";

export async function execute(_: any, message: Message): Promise<Reply> {
  const roleEntities = await getRepository(RoleEntity).find({
    where: {
      guild: message.guild.id,
    },
  });
  const roleNames = roleEntities.map((role) => role.roleName);
  const reply = new MessageEmbed();
  return reply;
}
