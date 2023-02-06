import {
  FastifyError,
  FastifyRequest,
  FastifyReply,
  FastifyErrorCodes,
} from "fastify";

export function errorHandler(
  error: FastifyError,
  request: FastifyRequest,
  reply: FastifyReply
) {
  const { code, message, name, statusCode, validation, validationContext } =
    error;

  let response;

  if (code == "FST_ERR_BAD_STATUS_CODE") {
    // Log error
    console.log(error);
    // Send error response
    reply.status(500).send({ ok: false });
  } else if (validation) {
    response = `A Validation Error occured in ${validationContext}`;
    statusCode
      ? reply.status(statusCode).send(response)
      : reply.status(500).send(response);
  } else {
    // fastify will use parent error handler to handle this
    reply.send(error);
  }
}
