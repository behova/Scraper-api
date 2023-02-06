import { cleanEnv, num, str } from "envalid";

export const env = cleanEnv(process.env, {
  PORT: num(),
  IMAGES_PATH: str(),
  NODE_ENV: str({
    choices: ["development", "production"],
  }),
});

export type Source = "REDDIT" | "FOURCHAN";
