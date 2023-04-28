import { z } from 'zod';

/**
 * A helper function that returns a type guard
 * @param schema A Zod Schema
 * @returns A Type Guard function that safely parses an unknown item to a zod schema, and asserts that it equals the corresponding type
 */
export const SchemaTypeGuard =
  <T>(schema: z.Schema<T>) =>
  (body: unknown): body is T =>
    schema.safeParse(body).success;
