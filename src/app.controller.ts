import express from "express";
import type { Express } from "express";
import { env } from "./config/env.service";
import { ratelimiter } from "./common/middleware/rateLimiter";
import helmet from "helmet";
import { catchErrors } from "./common/middleware/catcher";
import authRouter from "./module/auth/auth.controller";
import { databaseConnection } from "./database/connection";
export const boostrap = async () => {
  const app: Express = express();
  await databaseConnection();
  app.use(express.json());
  app.use("/auth", authRouter);
  app.use(ratelimiter);
  app.use(helmet());
  app.use(catchErrors);
  app.listen(env.port, () =>
    console.log(`server is runing on port ${env.port}`),
  );
};
