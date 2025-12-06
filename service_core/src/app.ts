import "reflect-metadata";
import { init } from "./modules/typeorm";
import app from "./modules/app";
import router from "./modules/router";
import logger from "./tools/logger";
import * as cors from "@koa/cors";
import * as bodyParser from "koa-bodyparser";
import "./routes";

app.use(cors({ origin: "*" }));
app.use(bodyParser());
app.use(router.routes());

async function setup() {
  await init();
}

setup()
  .then(() => {
    logger.info(`Starting application on port ${3000}`);
    app.listen(3000);
  })
  .catch((err) => {
    logger.error(err, "Error during application startup");
  });
