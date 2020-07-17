import { Entity, OneToMany, PrimaryColumn } from "typeorm";
import { Role } from "./role";

@Entity()
export class Guild {
  @PrimaryColumn()
  id: number;

  @OneToMany((type) => Role, (role) => role.guild)
  roles: Role[];
}
