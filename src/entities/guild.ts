import { Entity, OneToMany, PrimaryColumn } from "typeorm";
import { RoleEntity } from "./role";

@Entity()
export class GuildEntity {
  @PrimaryColumn("varchar", { length: 20 })
  id: string;

  @OneToMany((type) => RoleEntity, (role) => role.server, { cascade: true })
  roles: RoleEntity[];

  constructor(id?: string, roles?: RoleEntity[]) {
    this.id = id;
    this.roles = roles;
  }
}
