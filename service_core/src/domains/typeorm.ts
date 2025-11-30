import { DataSource } from "typeorm";
import logger from "../tools/logger";
import { AccountEntity } from "./entities/account.entity";

const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "postgres",
  database: "school",
  synchronize: true,
  logging: ["error"],
  entities: [AccountEntity],
});

export async function init() {
  try {
    await AppDataSource.initialize();
    logger.info("Data Source has been initialized!");
  } catch (error) {
    logger.error(error, "Error during Data Source initialization");
  }
}

export default AppDataSource;
