import fs from 'fs';
const logDir = 'logs';
if (!fs.existsSync(logDir)) fs.mkdirSync(logDir);

import winston from 'winston';
import 'winston-daily-rotate-file';
import { environment } from "../../env.js";

const { combine, timestamp, printf, colorize, errors } = winston.format;

const logFormat = printf(({ level, message, timestamp, stack }) => {
  return `${timestamp} [${level}] ${stack || message}`;
});

const dailyRotateTransport = new winston.transports.DailyRotateFile({
  dirname: 'logs',
  filename: '%DATE%-combined.log',
  datePattern: 'YYYY-MM-DD',
  zippedArchive: true,
  maxSize: '10m',
  maxFiles: '14d',
  level: 'info',
});

const dailyErrorRotate = new winston.transports.DailyRotateFile({
  dirname: 'logs',
  filename: '%DATE%-error.log',
  datePattern: 'YYYY-MM-DD',
  zippedArchive: true,
  maxSize: '10m',
  maxFiles: '30d',
  level: 'error',
});

export const logger = winston.createLogger({
  level: environment.prod ? 'info' : 'debug',
  format: combine(
    timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    errors({ stack: true }),
    logFormat
  ),
  transports: [dailyRotateTransport, dailyErrorRotate],
});

if (!environment.prod) {
  logger.add(
    new winston.transports.Console({
      format: combine(colorize(), timestamp({ format: 'HH:mm:ss' }), logFormat),
    })
  );
}
