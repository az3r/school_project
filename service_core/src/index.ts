import "express";
import "reflect-metadata";
import { init } from "./modules/typeorm";
import app from "./modules/app";
import logger from "./tools/logger";
import * as cors from "cors";
import * as bodyParser from "body-parser";
import * as morgan from "morgan";

app.use(morgan('dev'));
app.use(cors({ origin: "*" }));
app.use(bodyParser.json());
import "./routes";

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

export default app;
