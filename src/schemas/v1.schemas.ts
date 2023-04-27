/**
 * Defines the zod validation schemas for {@link V1Router}
 *
 * @module V1Schemas
 */
import { z } from 'zod';

/**
 * The zod schema to validate the body for a POST request to /v1/
 */
export const IndexBodySchema = z.object({
  name: z
    .string({
      required_error: 'Email is required',
    })
    .nonempty(),
});
