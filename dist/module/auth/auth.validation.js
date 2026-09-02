"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signUpSchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.signUpSchema = {
    body: zod_1.default
        .strictObject({
        email: zod_1.default.string().email(),
        password: zod_1.default
            .string()
            .min(5, { error: "Password must be more than 5" })
            .max(20, { error: "Password must be less than 20 " }),
        username: zod_1.default.string(),
        confrimPassword: zod_1.default.string().optional(),
    })
        .superRefine((data, ctx) => {
        if (data.password == data.confrimPassword) {
            ctx.addIssue({
                code: "custom",
                message: "confirm password not matched with password ",
            });
        }
    }),
};
