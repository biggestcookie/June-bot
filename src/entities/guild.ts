import { Entity, OneToMany, PrimaryColumn } from "typeorm";
import { RoleEntity } from "./role";

@Entity()
export class GuildEntity {
  @PrimaryColumn("unsigned big int")
  id: number;

  @OneToMany((type) => RoleEntity, (role) => role.server, { cascade: true })
  roles: RoleEntity[];

  constructor(id?: number, roles?: RoleEntity[]) {
    this.id = id;
    this.roles = roles;
  }
}
