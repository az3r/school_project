import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export default class AccountAuth {
  @PrimaryColumn()
  account_id: string;

  @Column({ unique: true })
  challenge: string;

  @Column()
  rp_id: string;

  @Column()
  rp_name: string;

  @Column("text", { array: true })
  origin: string[];

  @Column({ type: "json" })
  options: PublicKeyCredentialRequestOptionsJSON;

  @Column({ type: "json", nullable: true })
  response: any;
}
