import fastify, { FastifyInstance } from "fastify";
import {
  getBulkImageHandler,
  getImageByPageHandler,
  getImageBySearchHandler,
} from "./image-controller.js";
import { $ref } from "./image-schema.js";

/**
 * Encapsulates the routes
 * @param {FastifyInstance} fastify  Encapsulated Fastify Instance
 * @param {Object} options plugin options, refer to https://www.fastify.io/docs/latest/Reference/Plugins/#plugin-options
 */

async function imageRoutes(fastify: FastifyInstance, options: Object) {
  fastify.route({
    method: "GET",
    url: "/api/images/:amount",
    schema: {
      params: $ref("maxImageResponseSchema"),
    },
    handler: getBulkImageHandler,
  });

  fastify.route({
    method: "GET",
    url: "/api/:page",
    schema: {
      params: $ref("maxPageAmountSchema"),
    },
    handler: getImageByPageHandler,
  });

  fastify.route({
    method: "POST",
    url: "/api/search",
    schema: {
      body: $ref("searchInput"),
    },
    handler: getImageBySearchHandler,
  });

  fastify.get("/api/status", function (request, reply) {
    reply.send({ hello: "world" });
  });
}

export default imageRoutes;
