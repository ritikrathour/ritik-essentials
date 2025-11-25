import { createLogger, format, transports } from "winston";
import DailyRotateFile from "winston-daily-rotate-file";
import path from "path";
// format
const customFormat = format.combine(
  format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
  format.errors({ stack: true }),
  format.printf(({ timestamp, level, message, stack }) => {
    return stack
      ? `[${timestamp}] ${level.toUpperCase()}: ${message}\nStack: ${stack}`
      : `[${timestamp}] ${level.toUpperCase()}: ${message}`;
  })
);

const logDir = path.join(__dirname, "../logs");
// transports
const transportList = [
  new transports.Console({
    level: "info",
    handleExceptions: true,
  }),

  new DailyRotateFile({
    filename: path.join(logDir, "application-%DATE%.log"),
    datePattern: "YYYY-MM-DD",
    level: "info",
    maxFiles: "14d", // keep logs for 14 days
    zippedArchive: true,
  }),

  new DailyRotateFile({
    filename: path.join(logDir, "error-%DATE%.log"),
    datePattern: "YYYY-MM-DD",
    level: "error",
    maxFiles: "30d",
    zippedArchive: true,
  }),
];
// logger
export const logger = createLogger({
  level: "info",
  format: format.combine(format.json(), customFormat),
  transports: transportList,
  exitOnError: false,
});
