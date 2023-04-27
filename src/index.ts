import Koa from 'koa';
import Router from '@koa/router';
import logger from './utils/logger';
import { LoggingMiddleware } from './middleware/Logging.middleware';
import { Version1Router } from './routes/v1';

const app = new Koa();
const v1 = new Version1Router();

const wait = async (ms: number) =>
  new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve();
    }, ms);
  });

app.use(LoggingMiddleware.receivedRequestMiddleware);
app.use(LoggingMiddleware.sentResponseMiddleware);
app.use(v1.setupRoutes().routes());

app.listen(3000, () => {
  logger.info(`Server started on port ${3000}`);
});
