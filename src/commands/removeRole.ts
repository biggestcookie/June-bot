import { RoleEntity } from "@/entities/role";
import { ArgsMap, Reply } from "@/utils/command";
import { Message } from "discord.js";
import config from "@/config.json";
import { getRepository } from "typeorm";
import { GuildEntity } from "@/entities/guild";

export async function execute(args: ArgsMap, message: Message): Promise<Reply> {
  const roleName = args.get(0) ?? args.get("roleName");
  await getRepository(RoleEntity).delete({
    roleName,
    guild: new GuildEntity(message.guild.id),
  });
  return `${roleName} ${config.commands.removerole.success}`;
}
