import { NextFunction, Request, Response } from "express";
import { ZodType } from "zod";
import { badRequest } from "../response/error.response";

type validationKey = keyof Request;
type validationSchema = Partial<Record<validationKey, ZodType>>;
export const validation = (schema: validationSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    let validationErros = [];
    for (const key of Object.keys(schema) as validationKey[]) {
      if (!schema[key]) {
        throw new badRequest("Validation error");
      }
      const value = schema[key].safeParse(req[key]);
      if (!value.success) {
        validationErros.push({
          key,
          issue: value.error.issues,
        });
      }
      if (validationErros.length > 0) {
        throw new badRequest("validatioin error", validationErros);
      }
      next();
    }
  };
};
