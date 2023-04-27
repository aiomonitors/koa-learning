import { Context, Next } from 'koa';
import logger from '../utils/logger';

export class LoggingMiddleware {
  static async receivedRequestMiddleware(ctx: Context, next: Next) {
    logger.info(`Received request`, {
      path: ctx.request.path,
      headers: ctx.request.headers,
    });

    await next();
  }

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
