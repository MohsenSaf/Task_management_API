import winston, { LogEntry } from "winston"
import "winston-mongodb"

if (!process.env.MONGO_URL) {
  throw new Error("MONGO_URL is not defined in the environment variables.")
}

export const mongoTransport = new winston.transports.MongoDB({
  db: process.env.MONGO_URL,
  collection: "log",
  options: {
    useUnifiedTopology: true,
  },
})

export const logger = winston.createLogger({
  level: "info",
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: "error.log", level: "error" }),
    new winston.transports.File({ filename: "all.log" }),
    mongoTransport,
  ],
})

interface CustomLogOptions extends Omit<LogEntry, "message"> {
  message: string
  customField?: string
}

export function log(options: CustomLogOptions) {
  logger.log({ level: "info", ...options })
}
