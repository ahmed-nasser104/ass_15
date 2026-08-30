"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cloudinary_1 = require("cloudinary");
const env_service_1 = require("../../config/env.service");
cloudinary_1.v2.config({
    cloud_name: env_service_1.env.cloud_name,
    api_key: env_service_1.env.api_key,
    api_secret: env_service_1.env.api_secret,
});
exports.default = cloudinary_1.v2;
