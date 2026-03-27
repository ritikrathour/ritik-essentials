import { Request, Response } from "express";
import connectDB from "./v1/DB/db";
import mongoose from "mongoose";
import { redisClient } from "./libs/RedisClient";
import { config } from "./config";
import { logger } from "./config/Logger";
import app from "./app";
const PORT = config.port || 5000;
// db connect
connectDB();
// redis db connect
(async () => {
  try {
    await redisClient.connect();
    logger.info({ message: `Connected to Redis...` });
  } catch (error) {
    logger.info({ message: "DB error", error });
  }
})();
app.listen(PORT, () => {
  logger.info({ message: `Server running at http://localhost:${PORT}` });
});
app.get("/", (req: Request, res: Response) => {
  res.send("Server is running!");
});

const shutDown = (server: { close: (arg0: () => void) => void }) => {
  logger.warn({ message: "shutting down server...." });
  server?.close(() => {
    logger.warn({ message: "closed Server..." });
    mongoose.connection.close();
  });
};
process.on("SIGINT", shutDown);
process.on("SIGTERM", shutDown);
