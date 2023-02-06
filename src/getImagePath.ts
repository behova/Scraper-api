import { env } from "./interfaces.js";

function getImagePath() {
  const path = env.IMAGES_PATH;
  return path;
}

export default getImagePath;
