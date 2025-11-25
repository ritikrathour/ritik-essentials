import { Request, Response } from "express";
import app from "./src/app";
import connectDB from "./src/v1/DB/db";
import mongoose from "mongoose";
// import { redisClient } from "./src/libs/RedisClient";
import { config } from "./src/config";
import { logger } from "./src/config/Logger";
// import { getUserKey } from "./src/config/Redis_keys";

const PORT = config.port || 5000;
// db connect
connectDB();
// redis db connect
// (async () => {
//   try {
//     await redisClient.connect();
//     // await redisClient.del(getUserKey("ritikrathour73@gmail.com"));
// logger.info({ message: `Connected to Redis...` });
//   } catch (error) {
// logger.info({ message: "DB error",error });
// }
// })();
app.listen(PORT, () => {
  logger.info({ message: `Server running at http://localhost:${PORT}` });
});
app.get("/", (req: Request, res: Response) => {
  res.send("Server is running!");
});

const shutDown = (server: { close: (arg0: () => void) => void }) => {
  logger.warn({ message: "shutting down server...." });
  server.close(() => {
    logger.warn({ message: "closed Server..." });
    mongoose.connection.close();
  });
};
process.on("SIGINT", shutDown);
process.on("SIGTERM", shutDown);
