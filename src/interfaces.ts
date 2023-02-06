import { cleanEnv, str } from "envalid";

// export interface ProcessEnv {
//   DATABASE_URL: string;
//   IMAGES_PATH: string;
// }

export const env = cleanEnv(process.env, {
  IMAGES_PATH: str(),
  NODE_ENV: str({
    choices: ["development", "production"],
  }),
});

export type Source = "REDDIT" | "FOURCHAN";
