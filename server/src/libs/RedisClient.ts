import { createClient } from "redis";
import dotenv from "dotenv";
import { config } from "../config";
import { logger } from "../config/Logger";
dotenv.config();
export const redisClient = createClient({
  url: config.redisURL,
  socket: {
    reconnectStrategy: (retries) => {
      if (retries > 5) {
        logger.error("🔌 Redis: Too many retries, stopping.");
        return new Error("Redis retry limit reached");
      }
      logger.info(`🔁 Redis: Retry attempt #${retries}`);
      return Math.min(retries * 100, 3000); // backoff time (ms)
    },
  },
});
redisClient.on("error", (err) => {
  logger.info("Redis Client Error", err);
});
