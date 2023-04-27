import Koa from 'koa';
import Router from '@koa/router';
import logger from './utils/logger';

const app = new Koa();
const router = new Router();

const wait = async (ms: number) =>
  new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve();
    }, ms);
  });

app.use(async (ctx, next) => {
  logger.info(`Received request`, {
    path: ctx.request.path,
    headers: ctx.request.headers,
  });

  await next();
});

app.use(async (ctx, next) => {
  const start = +new Date();
  await next();

  logger.info('Sent response', {
    path: ctx.response.status,
    body: ctx.response.body,
    requestTime: +new Date() - start,
  });
});

app.use(router.routes()).use(router.allowedMethods());

router.get('/', async (ctx) => {
  await wait(1000);
  ctx.status = 200;
  ctx.body = 'Hello world';
});

app.listen(3000, () => {
  logger.info(`Server started on port ${3000}`);
});
