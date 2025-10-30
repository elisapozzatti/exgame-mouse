import bodyParser from "@koa/bodyparser";
import cors from "@koa/cors";
import Router from "@koa/router";
import { createServer } from "http";
import Koa from "koa";
import { config } from "./config/config";
import { initSocketIo } from "./io";
import logger from "./middlewares/logger";
import examsRoute from "./routes/exams";
import serverRoute from "./routes/server";
import subscriptionsRoute from "./routes/subscriptions";
import mongoose from "mongoose";
import { dbClient } from "./lib/db"

const app = new Koa();
const router = new Router();

app.use(dbClient);

app.use(logger);
app.use(bodyParser());

app.use(
  cors({
    origin: config.FRONTEND_APP,
  }),
);

app.use(router.routes()).use(router.allowedMethods());
app.use(serverRoute.routes()).use(serverRoute.allowedMethods());
app.use(examsRoute.routes()).use(examsRoute.allowedMethods());
app.use(subscriptionsRoute.routes()).use(subscriptionsRoute.allowedMethods());

const httpServer = createServer(app.callback());
initSocketIo(httpServer);

httpServer.listen(config.PORT, () => {
  console.log(`Server running at http://${config.HOST}:${config.PORT}`);
});
