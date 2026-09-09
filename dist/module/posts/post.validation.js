"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postValidation = void 0;
const zod_1 = __importDefault(require("zod"));
exports.postValidation = zod_1.default.strictObject({
    likes: zod_1.default.array(zod_1.default.string().length(24, { error: () => ({ message: "Invalid userId" }) })),
    userId: zod_1.default
        .string()
        .length(24, { error: () => ({ message: "Invalid userId" }) }),
    content: zod_1.default
        .string()
        .min(1, { error: () => ({ message: "Content is required" }) })
        .max(500),
    comments: zod_1.default.array(zod_1.default.string().length(24, { error: () => ({ message: "Invalid userId" }) })),
    //   photo: z.string().optional(),
});
