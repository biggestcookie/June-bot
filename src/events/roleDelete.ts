import { RoleEntity } from "@/entities/role";
import { getRepository } from "typeorm";

export async function run(role: RoleEntity) {
  const roleRepo = getRepository(RoleEntity);
  const roleEnt = await roleRepo.findOne(role.id);
  if (roleEnt) await roleRepo.delete(roleEnt);
}
