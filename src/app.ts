import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import { LoggingMiddleware } from './middleware/Logging.middleware';
import { Version1Router } from './routes/v1.routes';

export class AppServer {
  app = new Koa();

  v1 = new Version1Router();

  constructor() {
    this.addExternalMiddleware();
    this.addLoggingMiddleware();
    this.setupRouters();
  }

  addLoggingMiddleware() {
    this.app.use(LoggingMiddleware.receivedRequestMiddleware);
    this.app.use(LoggingMiddleware.sentResponseMiddleware);
  }

  addExternalMiddleware() {
    this.app.use(bodyParser());
  }

  setupRouters() {
    this.app.use(this.v1.setupRoutes().routes());
  }
}
