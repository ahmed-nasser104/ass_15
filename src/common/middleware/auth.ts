import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import { unauthorized } from "./response/error.response";
import { DatabaseRepostaory } from "../reposatory/database.reposatory";
import { userModel } from "../../database/models/user.mode";
import { User } from "../interfaces/user.interface";
import { tokenService } from "../utils/service/token.service";
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
  try {
    switch (flag) {
      case "Bearer":
        const { signature } = tokenService.decoder(token);
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
