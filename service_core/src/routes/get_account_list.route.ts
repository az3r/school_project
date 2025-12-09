import AccountEntity from "../domains/entities/account.entity";
import CreateAccountDto from "../dtos/create_account.dto";
import entity_manager from "../modules/typeorm";
import { nanoid } from "nanoid";
import logger from "../tools/logger";
import app from "../modules/app";

app.get("/get_account_list", async (req, res) => {
  const account_list = await entity_manager.find(AccountEntity);
  logger.info(account_list);
  return res.json(account_list);
});

app.post("/create_account", async (req, res) => {
  const data = req.body as CreateAccountDto;
  const entity = entity_manager.create(AccountEntity, data);
  entity.id = nanoid(6);

  await entity_manager.save(entity);
  return res.json(entity);
});
