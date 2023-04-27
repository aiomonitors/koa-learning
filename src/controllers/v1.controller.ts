import { Context, Next } from 'koa';
import { ZodError } from 'zod';
import { isTestBody } from '../types/v1';
import { IndexBodySchema } from '../schemas/v1.schemas';

export class Version1Controller {
  static async getIndex(ctx: Context) {
    ctx.body = 'Hello world';
  }

  static async postIndex(ctx: Context) {
    if (isTestBody(ctx.request.body)) {
      ctx.body = {
        success: true,
        message: `Hello ${ctx.request.body.name}`,
      };
    }

    await IndexBodySchema.parseAsync(ctx.request.body);
  }

  static async errorHandler(ctx: Context, next: Next) {
    try {
      await next();
    } catch (err) {
      const body: Record<string, unknown> = {
        success: false,
        message: 'Error in server',
      };
      ctx.status = 500;

      if (err instanceof ZodError) {
        ctx.status = 400;
        body.data = err.issues;
        body.message = 'Invalid request body';
      }

      ctx.body = body;
    }
  }
}
