import { RegistrationController } from "../controllers/register";
import { PrefixRouter } from "../shared/PrefixRouter";

export class RegistrationRouter extends PrefixRouter {
    constructor() {
        super('/register');
    }

    setupRoutes() {
        this.router.use(RegistrationController.errorHandler);
        this.router.post('/create', RegistrationController.registerUser);
        return this;
    }
}