import { DataSource } from "typeorm";
import logger from "../tools/logger";
import { AccountEntity } from "../domains/entities/account.entity";

const data_source = new DataSource({
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
    await data_source.initialize();
    logger.info("Data Source has been initialized!");
  } catch (error) {
    logger.error(error, "Error during Data Source initialization");
  }
}

const entity_manager = data_source.createEntityManager();

export default entity_manager;
