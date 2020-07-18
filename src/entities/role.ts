import { Column, Entity, ManyToOne, PrimaryColumn } from "typeorm";
import { GuildEntity } from "./guild";

@Entity()
export class RoleEntity {
  @PrimaryColumn("varchar", { length: 20 })
  id: string;

  @Column("varchar", { length: 100 })
  roleName: string;

  @ManyToOne((type) => GuildEntity, (guild) => guild.roles, {
    onDelete: "CASCADE",
  })
  guild: GuildEntity;

  constructor(id?: string, roleName?: string, guild?: GuildEntity) {
    this.id = id;
    this.roleName = roleName;
    this.guild = guild;
  }
}
