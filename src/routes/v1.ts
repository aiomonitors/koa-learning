import { PrefixRouter } from '../shared/PrefixRouter';

export class Version1Router extends PrefixRouter {
  constructor() {
    super('/v1');
  }

  setupRoutes() {
    this.router.get('/', (ctx) => {
      ctx.body = 'Hello';
      ctx.status = 200;
    });

    return this;
  }
}
