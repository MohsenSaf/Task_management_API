import Redis from "ioredis"

export const redisClient = new Redis({
  port: Number(process.env.REDIS_PORT),
  keyPrefix: process.env.REDIS_KEY_PREFIX,
})
