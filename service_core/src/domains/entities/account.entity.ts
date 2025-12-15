import { Column, Entity, PrimaryColumn, UpdateDateColumn } from "typeorm";
import AccountDomain from "../enums/account_domain.enum";

@Entity()
export default class Account {
  @PrimaryColumn()
  id: string;

  @Column({ type: "enum", enum: AccountDomain })
  domain: AccountDomain;

  @UpdateDateColumn({ default: new Date() })
  updated_at: Date;
}
