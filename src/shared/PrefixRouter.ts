import Router from '@koa/router';

export class PrefixRouter {
  router: Router;

  constructor(prefix: string) {
    this.router = new Router();
    this.router.prefix(prefix);
  }

  routes() {
    return this.router.routes();
  }
}
