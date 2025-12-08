import { RegistrationResponseJSON } from "@simplewebauthn/server";
import { Column, Entity, PrimaryColumn, Unique } from "typeorm";

@Entity()
export default class PasskeyEntity {
  @PrimaryColumn()
  account_id: string;

  @Column({ unique: true })
  challenge: string;

  @Column({ type: "json" })
  options: PublicKeyCredentialCreationOptionsJSON;

  @Column({ type: "json", nullable: true })
  response: RegistrationResponseJSON | null;

  @Column({ type: "json", nullable: true })
  registration_info: any;
}
