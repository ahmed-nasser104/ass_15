"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.commentsModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const commentsSchema = new mongoose_1.default.Schema({
    userId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "user",
        required: true,
    },
    postId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "posts",
        required: true,
    },
}, {
    timestamps: true,
});
exports.commentsModel = mongoose_1.default.model("comments", commentsSchema);
