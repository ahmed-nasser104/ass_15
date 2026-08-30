import jwt from "jsonwebtoken";
import { env } from "../../../config/env.service";
export class Token {
  constructor() {}
  generateTokens(user: any) {
    let signature: string = "";
    let audience: string = "";
    let refreshSgnature: string = "";
    switch (user.role) {
      case "user":
        signature = env.user_signature;
        audience = "user";
        refreshSgnature = env.user_refresh_signature;
        break;
      default:
        signature = env.admin_signature;
        audience = "admin";
        refreshSgnature = env.admin_refresh_signature;
        break;
    }
    const accessToken = jwt.sign({ id: user._id }, signature, {
      audience: audience,
      expiresIn: "30m",
    });
    const refreshToken = jwt.sign({ id: user._id }, refreshSgnature, {
      audience: audience,
      expiresIn: "1y",
    });
    return { accessToken, refreshToken };
  }
}
