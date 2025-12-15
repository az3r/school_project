import Account from "../domains/entities/account.entity";
import CreateAccountDto from "../dtos/create_account.dto";
import entity_manager from "../modules/typeorm";
import { nanoid } from "nanoid";
import logger from "../tools/logger";
import app from "../modules/app";

app.get("/get_account_list", async (req, res) => {
  const account_list = await entity_manager.find(Account);
  logger.info(account_list);
  return res.json(account_list);
});

app.post("/create_account", async (req, res) => {
  const data = req.body as CreateAccountDto;
  const entity = entity_manager.create(Account, data);
  entity.id = nanoid(6);

  await entity_manager.save(entity);
  return res.json(entity);
});

app.post("/update_account_activation", async (req, res) => {
  const body = req.body as { id: string; is_activated: boolean };

  const account = await entity_manager.findOneBy(Account, {
    id: body.id,
  });
  account.is_activated = body.is_activated;
  entity_manager.save(account);

  return res.json(account);
});
