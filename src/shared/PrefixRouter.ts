/**
 * @module PrefixRouter
 * @category Shared
 */
import Router from '@koa/router';

export class PrefixRouter {
  /** The router created for the specific prefix  */
  router: Router;

  /**
   * Instantiates a {@link PrefixRouter}
   * @param prefix - The string prefix for the route EX: /v1
   */
  constructor(prefix: string) {
    this.router = new Router();
    this.router.prefix(prefix);
  }

  /**
   * @returns Returns koa router middleware which dispatches a route matching the request
   */
  routes() {
    return this.router.routes();
  }
}
