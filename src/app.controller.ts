import express from "express";
import type { Express } from "express";
import { env } from "./config/env.service";
import { ratelimiter } from "./common/middleware/rateLimiter";
import helmet from "helmet";
import { catchErrors } from "./common/middleware/catcher";
import authRouter from "./module/auth/auth.controller";
import { databaseConnection } from "./database/connection";
import RedisConnection from "./database/redis/redis";
import friendsRouter from "./module/friends/freinds.controller";
import { GraphQLObjectType, GraphQLSchema, GraphQLString } from "graphql";
import { createHandler } from "graphql-http/lib/use/express";
import { schema } from "./module/gql/schema.gql";
export const boostrap = async () => {
  const app: Express = express();

  app.all(
    "/graphQL",
    createHandler({ schema: schema, context: (req) => ({ req }) }),
  ); // الفرق بين ال app.all , app.use ان ال all لا تقبل routing
  await databaseConnection();
  await RedisConnection.connection();
  app.use(express.json());
  app.use("/auth", authRouter);
  app.use("/friends", friendsRouter);
  app.use(ratelimiter);
  app.use(helmet());
  app.use(catchErrors);
  app.listen(env.port, () =>
    console.log(`server is runing on port ${env.port}`),
  );
};
