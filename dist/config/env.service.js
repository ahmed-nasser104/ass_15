"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.env = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const nodeEnv = process.env.NODE_ENV;
const envPath = path_1.default.resolve(process.cwd(), `.env.${nodeEnv}`);
dotenv_1.default.config({ path: envPath });
exports.env = {
    port: process.env.PORT,
    mood: process.env.MOOD,
    user_email: process.env.EMAIL_USER,
    user_password: process.env.EMAIL_PASSWORD,
    salt_rounds: process.env.SALT_ROUNDS,
    user_signature: process.env.USER_SIGNATURE,
    admin_signature: process.env.ADMIN_SIGNATURE,
    user_refresh_signature: process.env.USER_REFRESH_SIGNATURE,
    admin_refresh_signature: process.env.ADMIN_REFRESH_SIGNATURE,
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
    access_key: process.env.Access_key_ID,
    secret_key: process.env.Secret_access_key,
    redis_url: process.env.REDIS_URL,
};
