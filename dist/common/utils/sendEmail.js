"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendMail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const env_service_1 = require("../../config/env.service");
const transporter = nodemailer_1.default.createTransport({
    service: "gmail",
    auth: {
        user: env_service_1.env.user_email,
        pass: env_service_1.env.user_password,
    },
});
const sendMail = async ({ to, subject, html, }) => {
    const info = await transporter.sendMail({
        from: env_service_1.env.user_email,
        to,
        subject,
        html,
    });
    return info;
};
exports.sendMail = sendMail;
