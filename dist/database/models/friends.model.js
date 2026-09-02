"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.friendsModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const friendsSchema = new mongoose_1.default.Schema({
    userId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "user",
        required: true,
    },
    friendId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    accepted: {
        type: Boolean,
        default: false,
    },
    rejected: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: true,
});
exports.friendsModel = mongoose_1.default.model("friends", friendsSchema);
