import fastify from "fastify";
import imageRoutes from "./modules/Images/image-route.js";
import { imageSchemas } from "./modules/Images/image-schema.js";
import { errorHandler } from "./modules/errorHandler.js";
import envToLogger from "./logger.js";
import fastifyHelmet from "@fastify/helmet";
import fastifyCors from "@fastify/cors";
import fastifyStatic from "@fastify/static";
import { env } from "./interfaces.js";

async function app() {
  //create fastify instance. configure logger
  const server = fastify({ logger: envToLogger(), trustProxy: true });

  //set error handler
  server.setErrorHandler(errorHandler);

  //add schemas to server instance
  for (const schema of imageSchemas) {
    server.addSchema(schema);
  }

  //register plugins
  server.register(fastifyHelmet, { global: true });
  server.register(fastifyCors, {
    origin: "*",
    methods: ["GET"],
  });
  server.register(fastifyStatic, {
    root: env.IMAGES_PATH,
    prefix: "/public/",
  });

  //register routes with server instance
  server.register(imageRoutes);

  //init server
  server.listen({ port: env.PORT }, (err, address) => {
    if (err) {
      server.log.error(err);
      process.exit(1);
    }
    console.log(`Server listening at ${address}`);
  });
}

export default app;
