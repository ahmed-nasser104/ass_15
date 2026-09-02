"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postsModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const postsSchema = new mongoose_1.default.Schema({
    likes: {
        type: Number,
        default: 0,
    },
    userId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "user",
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    comments: {
        type: Number,
        default: 0,
    },
    photo: {
        type: String,
    },
}, {
    timestamps: true,
});
exports.postsModel = mongoose_1.default.model("posts", postsSchema);
