import { createClient, RedisClientType } from "redis";
import { env } from "../../../config/env.service";
import { Types } from "mongoose";

class RedisService {
  private client: RedisClientType;
  constructor() {
    this.client = createClient({ url: env.redis_url });
  }
  set = async ({
    key,
    value,
    ttl,
  }: {
    key: string;
    value: string;
    ttl: number;
  }) => {
    return this.client.set(key, value, { EX: ttl });
  };
  get = async (key: string) => {
    return this.client.get(key);
  };
  del = async (key: string) => {
    return this.client.del(key);
  };
  mget = async (...keys: string[]) => {
    return this.client.MGET(keys);
  };

  key = (user_id: Types.ObjectId) => {
    return `user:${user_id}`;
  };

  async addSocket(user_id: Types.ObjectId, socket_id: string) {
    return await this.client.sAdd(this.key(user_id), socket_id);
  }

  async removeSocket(user_id: Types.ObjectId, socket_id: string) {
    return await this.client.sRem(this.key(user_id), socket_id);
  }

  async getSockets(user_id: Types.ObjectId) {
    return await this.client.sMembers(this.key(user_id));
  }

  async hasSocket(user_id: Types.ObjectId, socket_id: string) {
    return await this.client.sIsMember(this.key(user_id), socket_id);
  }

  async removeUserSockets(user_id: Types.ObjectId) {
    return await this.client.del(this.key(user_id));
  }
}

export const redisService = new RedisService();
