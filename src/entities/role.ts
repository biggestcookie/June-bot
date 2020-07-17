import { Column, Entity, ManyToOne, PrimaryColumn } from "typeorm";
import { Guild } from "./guild";

@Entity()
export class Role {
  @PrimaryColumn()
  id: number;

  @Column("varchar", { length: 100 })
  roleName: string;

  @ManyToOne((type) => Guild, (guild) => guild.roles)
  guild: Guild;
}
