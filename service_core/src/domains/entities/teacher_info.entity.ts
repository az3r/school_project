import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import AccountInfo from "../interfaces/account_info.interface";
import SchoolSubject from "../enums/school_subject.enum";
import Account from "./account.entity";

@Entity()
export default class TeacherInfo implements AccountInfo {
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

  @Column({ enum: SchoolSubject, type: "enum" })
  subject: SchoolSubject;
}
