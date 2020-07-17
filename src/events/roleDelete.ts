import { getRepository } from "typeorm";
import { Role } from "discord.js";

export async function run(role: Role) {
  const roleRepo = getRepository(Role);
  const server = await roleRepo.findOne(Number(role.id));
  if (server) await roleRepo.delete(server);
}
