import { FastifyReply, FastifyRequest } from "fastify";
import { MaxImageResponse, MaxPageInput, SearchInput } from "./image-schema.js";
import {
  getImagesBulk,
  getImageByPage,
  searchImages,
} from "./image-service.js";

export async function getBulkImageHandler(
  request: FastifyRequest<{ Params: MaxImageResponse }>,
  reply: FastifyReply
) {
  //console.log(request.params.amount);
  const amount = parseInt(request.params.amount);

  try {
    const images = await getImagesBulk(amount);

    return reply.code(201).send(images);
  } catch (error) {
    console.log(error);
    return reply.code(500).send(error);
  }
}

export async function getImageByPageHandler(
  request: FastifyRequest<{ Params: MaxPageInput }>,
  reply: FastifyReply
) {
  //console.log(request.params.page);
  const page = parseInt(request.params.page);

  try {
    const images = await getImageByPage(page);

    return reply.code(201).send(images);
  } catch (error) {
    console.log(error);
    return reply.code(500).send(error);
  }
}

export async function getImageBySearchHandler(
  request: FastifyRequest<{ Body: SearchInput }>,
  reply: FastifyReply
) {
  const { query } = request.body;

  try {
    const images = await searchImages(query);

    request.log.info(request.body.query);

    return reply.code(201).send(images);
  } catch (error) {
    console.log(error);
    return reply.code(500).send(error);
  }
}
