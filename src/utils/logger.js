import winston from "winston";
import "winston-daily-rotate-file";
import { environment } from "../../env.js";
import fs from "fs";
import path from "path";

const { combine, timestamp, printf, colorize, errors } = winston.format;

// Asegurarse de que las carpetas existan
const logDir = "logs";
const errorDir = path.join(logDir, "error");
const combinedDir = path.join(logDir, "combined");

[logDir, errorDir, combinedDir].forEach((dir) => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
});

const logFormat = printf(({ level, message, timestamp, stack }) => {
  return `${timestamp} [${level}] ${stack || message}`;
});

const dailyRotateTransport = new winston.transports.DailyRotateFile({
  dirname: combinedDir,
  filename: "%DATE%-combined.log",
  datePattern: "YYYY-MM-DD",
  zippedArchive: true,
  maxSize: "10m",
  maxFiles: "14d",
  level: "info",
});

const dailyErrorRotate = new winston.transports.DailyRotateFile({
  dirname: errorDir,
  filename: "%DATE%-error.log",
  datePattern: "YYYY-MM-DD",
  zippedArchive: true,
  maxSize: "10m",
  maxFiles: "30d",
  level: "error",
});

export const logger = winston.createLogger({
  level: environment.prod ? "info" : "debug",
  format: combine(timestamp({ format: "YYYY-MM-DD HH:mm:ss" }), errors({ stack: true }), logFormat),
  transports: [dailyRotateTransport, dailyErrorRotate],
});

if (!environment.prod) {
  logger.add(
    new winston.transports.Console({
      format: combine(colorize(), timestamp({ format: "HH:mm:ss" }), logFormat),
    })
  );
}
