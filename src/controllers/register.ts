import { Context, Next } from 'koa';
import { ZodError } from 'zod';
import { RegistrationErrorMessages, RegistrationSuccessMessages, isCreateUserRequestBody } from '../types/register.types';
import { CreateUserSchema } from '../schemas/register';
import { APIErrorMessages } from '../types/api.types';

const existingUserNames = ['test', 'user123'];

export class RegistrationController {
  static async registerUser(ctx: Context) {
    if (isCreateUserRequestBody(ctx.request.body)) {
        const { username, password } = ctx.request.body;
        if (existingUserNames.includes(username)) {
            ctx.status = 400;
            ctx.body = {
                success: false,
                message: RegistrationErrorMessages.DUPLICATE_USER
            }
            return;
        }

        ctx.status = 200;
        ctx.body = {
            success: true,
            message: RegistrationSuccessMessages.CREATED_USER,
        }
    }

    // Should throw zod error, else will go to catch all
    await CreateUserSchema.parseAsync(ctx.request.body);
  }

  /**
   * Middleware for error handling for this controller
   * @param ctx Koa Request Context
   * @param next Koa Next Function
   */
  static async errorHandler(ctx: Context, next: Next) {
    try {
      await next();
    } catch (err) {
      const body: Record<string, unknown> = {
        success: false,
        message: APIErrorMessages.SERVER_COULD_NOT_HANDLE,
      };
      ctx.status = 500;

      if (err instanceof ZodError) {
        ctx.status = 400;
        body.data = err.issues;
        body.message = APIErrorMessages.INVALID_BODY;
      }

      ctx.body = body;
    }
  }
}
