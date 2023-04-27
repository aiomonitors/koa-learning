import { z } from 'zod';

export const IndexBodySchema = z.object({
  name: z
    .string({
      required_error: 'Email is required',
    })
    .nonempty(),
});
