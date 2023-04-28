import { z } from 'zod';

export const CreateUserSchema = z
  .object({
    username: z.string({
      required_error: 'Username is required',
    }),
    password: z.string().min(4),
    confirmPassword: z.string().min(4),
  })
  .superRefine(({ password, confirmPassword }, ctx) => {
    if (password !== confirmPassword) {
      ctx.addIssue({
        code: 'custom',
        message: 'The passwords did not match',
      });
    }
  });
