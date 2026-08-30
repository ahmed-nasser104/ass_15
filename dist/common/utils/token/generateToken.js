"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Token = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const env_service_1 = require("../../../config/env.service");
class Token {
    constructor() { }
    generateTokens(user) {
        let signature = "";
        let audience = "";
        let refreshSgnature = "";
        switch (user.role) {
            case "user":
                signature = env_service_1.env.user_signature;
                audience = "user";
                refreshSgnature = env_service_1.env.user_refresh_signature;
                break;
            default:
                signature = env_service_1.env.admin_signature;
                audience = "admin";
                refreshSgnature = env_service_1.env.admin_refresh_signature;
                break;
        }
        const accessToken = jsonwebtoken_1.default.sign({ id: user._id }, signature, {
            audience: audience,
            expiresIn: "30m",
        });
        const refreshToken = jsonwebtoken_1.default.sign({ id: user._id }, refreshSgnature, {
            audience: audience,
            expiresIn: "1y",
        });
        return { accessToken, refreshToken };
    }
}
exports.Token = Token;
