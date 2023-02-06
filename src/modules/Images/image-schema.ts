import { buildJsonSchemas } from "fastify-zod";
import { z } from "zod";

const createImageSchema = z.object({
  thumbURL: z.string(),
  fullURL: z.string(),
  name: z.string(),
  source: z.string(),
  pallet: z.string(),
});

const maxImageResponseSchema = z.object({
  amount: z.string().min(1).max(2).regex(/^\d+$/),
});

const maxPageAmountSchema = z.object({
  page: z.string().min(1).max(3).regex(/^\d+$/),
});

const searchInput = z.object({
  query: z
    .string()
    .min(1)
    .max(15)
    .regex(/^[a-z]+$/),
});

export type CreateImageInput = z.infer<typeof createImageSchema>;

export type MaxImageResponse = z.infer<typeof maxImageResponseSchema>;
export type MaxPageInput = z.infer<typeof maxPageAmountSchema>;

export type SearchInput = z.infer<typeof searchInput>;

export const { schemas: imageSchemas, $ref } = buildJsonSchemas({
  createImageSchema,
  maxImageResponseSchema,
  maxPageAmountSchema,
  searchInput,
});
