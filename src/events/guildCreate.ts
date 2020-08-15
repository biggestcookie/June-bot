import config from "@/config.json";
import { GuildEntity } from "@/entities/guild";
import { Guild } from "discord.js";
import { getRepository } from "typeorm";

export async function execute(guild: Guild) {
  const guildRepo = getRepository(GuildEntity);
  const newGuildEntity = new GuildEntity(guild.id);
  await guildRepo.save(newGuildEntity);
  console.log(`${config.console.guildCreate} '${guild.name}'`);
}
