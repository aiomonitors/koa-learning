/**
 * The types for the Version 1 of the API
 * @module V1Types
 */
import { z } from 'zod';
import { IndexBodySchema } from '../schemas/v1.schemas';
import { SchemaTypeGuard } from '../shared/Validation';

/**
 * The type for a body POSTed to /v1
 */
export type IndexBody = z.infer<typeof IndexBodySchema>;

/**
 * Type Guard function to check if a given body satisfies the type IndexBody
 * @param body The body of the request
 * @returns Boolean indicating if the body satisfies {@link IndexBody}
 */
export const isTestBody = SchemaTypeGuard(IndexBodySchema);
