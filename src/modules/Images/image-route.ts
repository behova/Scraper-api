import fastify, { FastifyInstance } from "fastify";
import prisma from "../../prisma-client.js";
import {
  getBulkImageHandler,
  getImageByPageHandler,
  getImageBySearchHandler,
} from "./image-controller.js";
import { $ref } from "./image-schema.js";
import { getImageByPage, getImagesBulk } from "./image-service.js";

/**
 * Encapsulates the routes
 * @param {FastifyInstance} fastify  Encapsulated Fastify Instance
 * @param {Object} options plugin options, refer to https://www.fastify.io/docs/latest/Reference/Plugins/#plugin-options
 */

async function imageRoutes(fastify: FastifyInstance, options: Object) {
  fastify.route({
    method: "GET",
    url: "/images/:amount",
    schema: {
      params: $ref("maxImageResponseSchema"),
    },
    handler: getBulkImageHandler,
  });

  fastify.route({
    method: "GET",
    url: "/:page",
    schema: {
      params: $ref("maxPageAmountSchema"),
    },
    handler: getImageByPageHandler,
  });

  fastify.route({
    method: "POST",
    url: "/search",
    schema: {
      body: $ref("searchInput"),
    },
    handler: getImageBySearchHandler,
  });

  // fastify.get("/images/search/:query", async (request, reply) => {
  //   let {query} = request.params;
  //   let result = await getImageByPage(query);

  //   if (result) {
  //     return result;
  //   } else return { somthing: "wentwrong" };
  // });
}

export default imageRoutes;
