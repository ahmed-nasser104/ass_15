import dotenv from "dotenv";
import path from "path";
import { Env } from "../common/interfaces/env.interface";
const nodeEnv = process.env.NODE_ENV;
const envPath = path.resolve(process.cwd(), `.env.${nodeEnv}`);
dotenv.config({ path: envPath });
export const env: Env = {
  port: process.env.PORT as string,
  mood: process.env.MOOD as string,
  user_email: process.env.EMAIL_USER as string,
  user_password: process.env.EMAIL_PASSWORD as string,
  salt_rounds: process.env.SALT_ROUNDS as string,
  user_signature: process.env.USER_SIGNATURE as string,
  admin_signature: process.env.ADMIN_SIGNATURE as string,
  user_refresh_signature: process.env.USER_REFRESH_SIGNATURE as string,
  admin_refresh_signature: process.env.ADMIN_REFRESH_SIGNATURE as string,
  cloud_name: process.env.CLOUD_NAME as string,
  api_key: process.env.API_KEY as string,
  api_secret: process.env.API_SECRET as string,
  access_key: process.env.Access_key_ID as string,
  secret_key: process.env.Secret_access_key as string,
};
