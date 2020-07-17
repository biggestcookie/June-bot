import { Column, Entity, ManyToOne, PrimaryColumn } from "typeorm";
import { GuildEntity } from "./guild";

@Entity()
export class RoleEntity {
  @PrimaryColumn("varchar", { length: 20 })
  id: string;

  @Column("varchar", { length: 100 })
  roleName: string;

  @ManyToOne((type) => GuildEntity, (server) => server.roles)
  server: GuildEntity;

  constructor(id?: string, roleName?: string, server?: GuildEntity) {
    this.id = id;
    this.roleName = roleName;
    this.server = server;
  }
}
