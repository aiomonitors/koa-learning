import { Context, Next } from 'koa';
import logger from '../utils/logger';

export class LoggingMiddleware {
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
