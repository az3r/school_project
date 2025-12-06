import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class AccountEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column({ default: false })
  is_activated: boolean;

  @Column({ default: new Date() })
  updated_at: Date;
}
