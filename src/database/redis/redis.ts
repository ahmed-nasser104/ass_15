import { createClient, RedisClientType } from "redis";
import { env } from "../../config/env.service";
class RedisConnection {
  private client: RedisClientType;
  constructor() {
    this.client = createClient({ url: env.redis_url });
    this.handleConnection();
  }
  handleConnection() {
    this.client.on("error", (err) => console.log("redis error", err));
    this.client.on("ready", () => console.log("redis connected"));
  }
  async connection() {
    return await this.client.connect();
  }
}

export default new RedisConnection();
