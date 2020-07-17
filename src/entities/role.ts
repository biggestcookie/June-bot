import { Column, Entity, ManyToOne, PrimaryColumn } from "typeorm";
import { GuildEntity } from "./guild";

@Entity()
export class RoleEntity {
  @PrimaryColumn("unsigned big int")
  id: number;

  @Column("varchar", { length: 100 })
  roleName: string;

  @ManyToOne((type) => GuildEntity, (server) => server.roles, {
    onDelete: "CASCADE",
  })
  server: GuildEntity;

  constructor(id?: number, roleName?: string, server?: GuildEntity) {
    this.id = id;
    this.roleName = roleName;
    this.server = server;
  }
}
