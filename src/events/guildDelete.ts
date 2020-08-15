import config from "@/config.json";
import { GuildEntity } from "@/entities/guild";
import { Guild } from "discord.js";
import { getRepository } from "typeorm";

export async function execute(guild: Guild) {
  const guildRepo = getRepository(GuildEntity);
  await guildRepo.delete(guild.id);
  console.log(`${config.console.guildDelete} '${guild.name}'`);
}
