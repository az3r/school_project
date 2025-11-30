import "reflect-metadata";
import { init } from "./domains/typeorm";
import app from "./modules/app";
import router from "./modules/router";
import logger from "./tools/logger";

// response
app.use((ctx) => {
  ctx.body = "Hello Koa";
});

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
