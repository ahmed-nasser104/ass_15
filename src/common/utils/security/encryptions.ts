import bcrypt from "bcrypt";
import { env } from "../../../config/env.service";
export const hashing = async (text: string) => {
  return await bcrypt.hash(text, Number(env.salt_rounds));
};

export const compareHash = async (text: string, cypherText: string) => {
  return await bcrypt.compare(text, cypherText);
};
