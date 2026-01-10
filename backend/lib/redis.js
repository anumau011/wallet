import { createClient } from "redis";

let redisClient;

export async function connectRedis() {
  try {
    const redisUrl = process.env.REDIS_URL;

    if (!redisUrl) {
      console.error("REDIS_URL is missing");
      process.exit(1);
    }

    redisClient = createClient({ url: redisUrl });

    redisClient.on("error", (err) => {
      console.error("Redis Client Error:", err);
    });

    await redisClient.connect();
    console.log("Redis connected successfully");
    
  } catch (error) {
    console.error("Redis connection failed:", error.message);
    process.exit(1);
  }
}

export function getRedisClient() {
  if (!redisClient) {
    throw new Error("Redis not initialized");
  }
  return redisClient;
}
