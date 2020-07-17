import { GuildEntity } from "@/entities/guild";
import { Guild } from "discord.js";
import { getRepository } from "typeorm";

export async function run(guild: Guild) {
  const serverRepo = getRepository(GuildEntity);
  const server = await serverRepo.findOne(Number(guild.id));
  if (server) await serverRepo.delete(server);
}
