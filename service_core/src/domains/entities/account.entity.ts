import { Column, Entity, PrimaryColumn, UpdateDateColumn } from "typeorm";

@Entity()
export default class AccountEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column({ default: false })
  is_activated: boolean;

  @UpdateDateColumn({ default: new Date() })
  updated_at: Date;
}
