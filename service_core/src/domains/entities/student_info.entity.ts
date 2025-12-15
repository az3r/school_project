import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from "typeorm";
import AccountInfo from "../interfaces/account_info.interface";
import Account from "./account.entity";

@Entity()
export default class StudentInfo implements AccountInfo {
  @PrimaryGeneratedColumn()
  id: string;

  @OneToOne(() => Account)
  @JoinColumn({ name: "account_id" })
  account: Account;

  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column()
  birthday: Date;

  @Column()
  grade: number;
}
