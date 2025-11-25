import mongoose from "mongoose";
import { logger } from "../../config/Logger";
const connectDB = async () => {
  try {
    const isProduction = process.env.NODE_ENV === "production";
    if (!process.env.MONGODB_DEV_URI || !process.env.MONGODB_PROD_URI) {
      throw new Error("MONGODB URI is not defined in environment variables");
    }
    await mongoose.connect(
      isProduction ? process.env.MONGODB_PROD_URI : process.env.MONGODB_DEV_URI
    );
    logger.info("Data Base Connected successefully...");
  } catch (error) {
    logger.error("DB connection failed...", error);
    process.exit(1);
  }
};
export default connectDB;
