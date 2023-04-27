import { z } from 'zod';
import { IndexBodySchema } from '../schemas/v1.schemas';

export type IndexBody = z.infer<typeof IndexBodySchema>;

export const isTestBody = (body: unknown): body is IndexBody =>
  IndexBodySchema.safeParse(body).success;
