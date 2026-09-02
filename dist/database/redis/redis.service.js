"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const redis_1 = require("redis");
const env_service_1 = require("../../config/env.service");
class RedisService {
    client;
    constructor() {
        this.client = (0, redis_1.createClient)({ url: env_service_1.env.redis_url });
    }
    handleConnection() {
        this.client.on("error", (err) => console.log("redis error", err));
        this.client.on("ready", () => console.log("redis connected"));
    }
    async connection() {
        return await this.client.connect();
    }
}
exports.default = new RedisService();
