import { Context, Next } from 'koa';
import { ZodError } from 'zod';
import { isTestBody } from '../types/v1.types';
import { IndexBodySchema } from '../schemas/v1.schemas';

/**
 * Version1Controller
 */
export class Version1Controller {
  /**
   * Controller for a get request to /
   * @param ctx Koa Request Context
   */
  static async getIndex(ctx: Context) {
    ctx.body = 'Hello world';
  }

  /**
   * Controller for POST request to /
   * @param ctx Koa Request Context
   */
  static async postIndex(ctx: Context) {
    if (isTestBody(ctx.request.body)) {
      ctx.body = {
        success: true,
        message: `Hello ${ctx.request.body.name}`,
      };
    }

    await IndexBodySchema.parseAsync(ctx.request.body);
  }

  /**
   * Middleware for error handling for this controller
   * @param ctx Koa Request Context
   * @param next Koa Next Function
   */
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
