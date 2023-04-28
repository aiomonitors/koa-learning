/**
 * The router for Version 1 of the API
 *
 * @module V1Router
 */
import { Version1Controller } from '../controllers/v1.controller';
import { PrefixRouter } from '../shared/PrefixRouter';
import { RegistrationRouter } from './register.routes';

export class Version1Router extends PrefixRouter {
  register = new RegistrationRouter();

  constructor() {
    super('/v1');
  }

  setupRoutes() {
    this.router.use(Version1Controller.errorHandler);
    this.router.get('/', Version1Controller.getIndex);
    this.router.post('/', Version1Controller.postIndex);
    this.router.use(this.register.setupRoutes().routes());

    return this;
  }
}
