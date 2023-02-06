import { env } from "./interfaces.js";

function envToLogger() {
  switch (env.NODE_ENV) {
    case "production": {
      return true;
    }
    case "development": {
      return {
        transport: {
          target: "pino-pretty",
          options: {
            translateTime: "HH:MM:ss Z",
            ignore: "pid,hostname",
          },
        },
      };
    }
    default:
      return true;
  }
}

export default envToLogger;
