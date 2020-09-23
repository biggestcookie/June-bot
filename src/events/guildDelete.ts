import config from "@/config.json";
import { Guild } from "discord.js";

export async function execute(guild: Guild) {
  // const guildRepo = getRepository(GuildEntity);
  // await guildRepo.delete(guild.id);
  console.log(`${config.console.guildDelete} '${guild.name}'`);
}
