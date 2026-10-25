import pino from "pino";
import { env } from "../config/env";

export const logger = pino({
  level: env.logLevel,
  transport: env.isProduction
    ? undefined
    : {
        target: "pino-pretty",
        options: { translateTime: "SYS:standard", colorize: true },
      },
});
