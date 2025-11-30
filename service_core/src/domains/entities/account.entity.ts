import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class AccountEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  email: string;

  @Column()
  is_activated: boolean;

  @Column()
  created_at: Date;
}
