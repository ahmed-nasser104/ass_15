import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import { unauthorized } from "./response/error.response";
import { DatabaseRepostaory } from "../reposatory/database.reposatory";
import { userModel } from "../../database/models/user.mode";
import { User } from "../interfaces/user.interface";
import { env } from "../../config/env.service";
export type addingUser = Request & {
  user?: any;
};
const repo = new DatabaseRepostaory<User>(userModel);
export const auth = async (
  req: addingUser,
  res: Response,
  next: NextFunction,
) => {
  const { authorization } = req.headers;
  if (!authorization) {
    throw new unauthorized("Authorization header is required");
  }
  const [flag, token] = authorization.split(" ");
  if (!flag || !token) {
    throw new unauthorized("Invalid authorization format");
  }
  let signature = "";
  try {
    switch (flag) {
      case "Bearer":
        const decoded: any = jwt.decode(token);
        if (!decoded) {
          throw new unauthorized("Invalid token");
        }
        switch (decoded.aud) {
          case "admin":
            signature = env.admin_signature;
            break;
          case "user":
            signature = env.user_signature;
            break;
          default:
            throw new unauthorized("Invalid audience");
        }
        const decodedUser = jwt.verify(token, signature);
        req.user = decodedUser;
        next();
        break;
      default:
        throw new unauthorized("Invalid authorization type");
    }
  } catch (error) {
    throw new unauthorized("Invalid token");
  }
};
