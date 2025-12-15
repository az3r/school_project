import { Column, TableInheritance } from "typeorm";

export default interface AccountInfo {
  first_name: string;
  last_name: string;
  birthday: Date;
}
