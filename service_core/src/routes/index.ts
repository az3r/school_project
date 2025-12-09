import app from "../modules/app";
import * as express from "express";
import "./account.route";
import "./passkeys.route";
import { join } from "node:path";

app.use(
  "/.well-known",
  express.static(join("public", "routes", ".well-known"))
);
