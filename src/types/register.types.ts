import { z } from 'zod';
import { CreateUserSchema } from '../schemas/register';
import { SchemaTypeGuard } from '../shared/Validation';
import { APIErrorMessages } from './api.types';

export enum RegistrationErrorMessages {
    DUPLICATE_USER = 'The user already exists.',
}

export enum RegistrationSuccessMessages {
    CREATED_USER = 'Created new user'
}

export type CreateUserRequestBody = z.infer<typeof CreateUserSchema>;

export const isCreateUserRequestBody = SchemaTypeGuard(CreateUserSchema);

export type CreateUserResponseBody = {
    success: true,
    message: RegistrationSuccessMessages;
    data: unknown;
} | {
    success: false,
    message: APIErrorMessages | RegistrationErrorMessages,
    data: z.ZodIssue[]
}