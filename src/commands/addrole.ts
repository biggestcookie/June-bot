import { updateDialogflowEntityEntry } from "@/api/dialogflow";
import config from "@/config.json";
import { GuildEntity } from "@/entities/guild";
import { RoleEntity } from "@/entities/role";
import { ArgsMap, Command } from "@/utils/command";
import { getRandomElement } from "@/utils/utils";
import { Message } from "discord.js";
import { getRepository } from "typeorm";

async function addRoleToList(args: ArgsMap, message: Message): Promise<string> {
  const roleArg = args.get(0) ?? args.get("rolename");
  const roleSynonyms = Array.from(args, ([key, value]) => value).splice(1);
  if (!roleArg) throw Error(config.console.error.args);
  const role = message.guild.roles.cache.find((role) =>
    parseInt(roleArg) ? role.id === roleArg : role.name === roleArg
  );
  if (!role) {
    return config.text.error.role;
  }
  const guildRepo = getRepository(GuildEntity);
  const guild = await guildRepo.findOne(message.guild.id);
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
  await updateDialogflowEntityEntry("rolename", role.name, roleSynonyms);
  await guildRepo.save(guild);
  return getRandomElement(config.text.success);
}

const addRole: Command = {
  dm: false,
  admin: true,
  run: addRoleToList,
};

export default addRole;
