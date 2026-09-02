"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const error_response_1 = require("./response/error.response");
const database_reposatory_1 = require("../reposatory/database.reposatory");
const user_mode_1 = require("../../database/models/user.mode");
const env_service_1 = require("../../config/env.service");
const repo = new database_reposatory_1.DatabaseRepostaory(user_mode_1.userModel);
const auth = async (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization) {
        throw new error_response_1.unauthorized("Authorization header is required");
    }
    const [flag, token] = authorization.split(" ");
    if (!flag || !token) {
        throw new error_response_1.unauthorized("Invalid authorization format");
    }
    let signature = "";
    try {
        switch (flag) {
            case "Bearer":
                const decoded = jsonwebtoken_1.default.decode(token);
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
                const decodedUser = jsonwebtoken_1.default.verify(token, signature);
                req.user = decodedUser;
                next();
                break;
            default:
                throw new error_response_1.unauthorized("Invalid authorization type");
        }
    }
    catch (error) {
        throw new error_response_1.unauthorized("Invalid token");
    }
};
exports.auth = auth;
