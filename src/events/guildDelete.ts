import { GuildEntity } from "@/entities/guild";
import { Guild } from "discord.js";
import { getRepository } from "typeorm";

export async function run(guild: Guild) {
  const guildRepo = getRepository(GuildEntity);
  const guildEntity = await guildRepo.findOne(guild.id);
  if (guildEntity) await guildRepo.delete(guildEntity);
}
