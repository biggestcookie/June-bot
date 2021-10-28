import { RoleEntity } from "@/entities/role";
import { ArgsMap } from "@/utils/command";
import { Message } from "discord.js";
import { getRepository } from "typeorm";
import config from "@/config.json";

export async function execute(
  args: ArgsMap,
  message: Message,
): Promise<string> {
  const roleName = args.get(0) ?? args.get("roleName");
  const roleEntity = await getRepository(RoleEntity).findOne({
    where: {
      guild: message.guild.id,
      roleName,
    },
  });
  await message.member.roles.remove(roleEntity.id);
  return `${config.commands.unsetrole.success} ${roleName}`;
}
