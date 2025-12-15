import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export default class ClassRoom {
  @PrimaryColumn()
  id: string;

  @Column()
  group: string;
}
