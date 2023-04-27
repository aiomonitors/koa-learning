/**
 * @module LoggingMiddleware
 */
import { Context, Next } from 'koa';
import logger from '../utils/logger';

/**
 * The Koa middleware to be used for logging
 */
export class LoggingMiddleware {
  /**
   * Logging middleware function for a received request
   * @param ctx Koa Request Context
   * @param next Koa Next Function
   */
  static async receivedRequestMiddleware(ctx: Context, next: Next) {
    const meta: Record<string, unknown> = {
      path: ctx.request.path,
      headers: ctx.request.headers,
      method: ctx.request.method,
    };

    if (ctx.request.method === 'POST') {
      meta.body = ctx.request.body;
    }

    logger.info(`Received request`, meta);

    await next();
  }

  /**
   * Logging middleware function to be run after response is sent to the client
   * @param ctx Koa Request Context
   * @param next Koa Next Function
   */
  static async sentResponseMiddleware(ctx: Context, next: Next) {
    const start = +new Date();
    await next();

    logger.info('Sent response', {
      path: ctx.response.status,
      body: ctx.response.body,
      requestTime: +new Date() - start,
    });
  }
}
