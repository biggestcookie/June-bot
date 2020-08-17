import { updateDialogflowEntityEntry } from "@/api/dialogflow";
import config from "@/config.json";
import { GuildEntity } from "@/entities/guild";
import { RoleEntity } from "@/entities/role";
import { ArgsMap } from "@/utils/command";
import { getRandomElement } from "@/utils/utils";
import { Message } from "discord.js";
import { getRepository } from "typeorm";

export async function execute(
  args: ArgsMap,
  message: Message
): Promise<string> {
  const roleName = args.get(0) ?? args.get("rolename");
  if (!roleName) throw Error(config.console.error.args);
  const roleSynonyms = Array.from(args, ([_, value]) => value).splice(1);
  let role = message.guild.roles.cache.find((role) => role.name === roleName);
  const roleExisted = !!role;
  if (!roleExisted) {
    role = await message.guild.roles.create({
      data: {
        name: roleName,
        mentionable: true,
      },
    });
  }
  const guildRepo = getRepository(GuildEntity);
  const guild = await guildRepo.findOne(message.guild.id, {
    relations: ["roles"],
  });
  const newRoleEntity = new RoleEntity(role.id, role.name, guild);
  if (guild.roles) {
    if (guild.roles.find((existingRole) => existingRole.id === role.id)) {
      return config.text.error.exists;
    } else {
      guild.roles.push(newRoleEntity);
    }
  } else {
    guild.roles = [newRoleEntity];
  }
  // handle existing role
  await updateDialogflowEntityEntry("rolename", role.name, roleSynonyms);
  await guildRepo.save(guild);
  return `${role.name} ${
    roleExisted
      ? config.commands.addrole.existingrole
      : config.commands.addrole.newrole
  }`;
}