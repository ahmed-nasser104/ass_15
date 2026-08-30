"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.databaseConnection = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const databaseConnection = async () => {
    try {
        await mongoose_1.default.connect("mongodb://127.0.0.1:27017/social-media");
        console.log("database connection successfully");
    }
    catch (error) {
        console.log("❌ database failed to connect");
    }
};
exports.databaseConnection = databaseConnection;
