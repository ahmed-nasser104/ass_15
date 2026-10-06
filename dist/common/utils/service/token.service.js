"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.tokenService = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const error_response_1 = require("../../middleware/response/error.response");
const env_service_1 = require("../../../config/env.service");
class TokenService {
    constructor() { }
    decoder(accest_token) {
        let signature = "";
        const decoded = jsonwebtoken_1.default.decode(accest_token);
        if (!decoded) {
            throw new error_response_1.unauthorized("Invalid token");
        }
        switch (decoded.aud) {
            case "admin":
                signature = env_service_1.env.admin_signature;
                break;
            case "user":
                signature = env_service_1.env.user_signature;
                break;
            default:
                throw new error_response_1.unauthorized("Invalid audience");
        }
        return { signature, decoded };
    }
}
exports.tokenService = new TokenService();
