import jwt from "jsonwebtoken";
import { unauthorized } from "../../middleware/response/error.response";
import { env } from "../../../config/env.service";

class TokenService {
  constructor() {}
  decoder(accest_token: string) {
    let signature = "";

    const decoded: any = jwt.decode(accest_token);
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
    return { signature, decoded };
  }
}

export const tokenService = new TokenService();
