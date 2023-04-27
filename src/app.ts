import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import { LoggingMiddleware } from './middleware/Logging.middleware';
import { Version1Router } from './routes/v1.routes';

export class AppServer {
  /** Koa application */
  app = new Koa();

  v1 = new Version1Router();

  /**
   * Create app and setup middleware
   */
  constructor() {
    this.addExternalMiddleware();
    this.addLoggingMiddleware();
    this.setupRouters();
  }

  /** Adds logging middleware in order */
  addLoggingMiddleware() {
    this.app.use(LoggingMiddleware.receivedRequestMiddleware);
    this.app.use(LoggingMiddleware.sentResponseMiddleware);
  }

  /** Adds external middleware */
  addExternalMiddleware() {
    this.app.use(bodyParser());
  }

  /** Setup routes */
  setupRouters() {
    this.app.use(this.v1.setupRoutes().routes());
  }
}
