import AccountEntity from "../domains/entities/account.entity";
import CreateAccountDto from "../dtos/create_account.dto";
import router from "../modules/router";
import entity_manager from "../modules/typeorm";
import { nanoid } from "nanoid";
import logger from "../tools/logger";

router.get("/get_account_list", async (ctx) => {
  const account_list = await entity_manager.find(AccountEntity);
  logger.info(account_list);
  ctx.body = account_list;
});

router.post("/create_account", async (ctx) => {
  const data = ctx.request.body as CreateAccountDto;
  const entity = entity_manager.create(AccountEntity, data);
  entity.id = nanoid(6);

  await entity_manager.save(entity);

  ctx.body = entity;
});
