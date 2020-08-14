import { RoleEntity } from "@/entities/role";
import { Message } from "discord.js";
import { getRepository } from "typeorm";

export async function execute(role: RoleEntity) {
  const roleRepo = getRepository(RoleEntity);
  await roleRepo.delete(role.id);
}
