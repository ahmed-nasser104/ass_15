"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.compareHash = exports.hashing = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const env_service_1 = require("../../../config/env.service");
const hashing = async (text) => {
    return await bcrypt_1.default.hash(text, Number(env_service_1.env.salt_rounds));
};
exports.hashing = hashing;
const compareHash = async (text, cypherText) => {
    return await bcrypt_1.default.compare(text, cypherText);
};
exports.compareHash = compareHash;
