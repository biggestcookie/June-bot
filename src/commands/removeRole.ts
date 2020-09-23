import { RoleEntity } from "@/entities/role";
import { ArgsMap, Reply } from "@/utils/command";
import { Message, MessageEmbed } from "discord.js";
import { getRepository } from "typeorm";
import { GuildEntity } from "@/entities/guild";

export async function execute(args: ArgsMap, message: Message): Promise<Reply> {
  const roleName = args.get(0) ?? args.get("rolename");
  const roleEntities = await getRepository(RoleEntity).delete({
    roleName,
    guild: new GuildEntity(message.guild.id),
  });
  const reply = new MessageEmbed();
  return reply;
}
