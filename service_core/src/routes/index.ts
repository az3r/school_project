import app from "../modules/app";
import * as express from "express";
import "./get_account_list.route";
import "./passkeys.route";
import { join } from "node:path";

app.use(
  "/.well-known",
  express.static(join("public", "routes", ".well-known"))
);
