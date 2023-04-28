import axios from 'axios';
import { CreateUserResponseBody, RegistrationErrorMessages } from './types/register.types';
import { APIErrorMessages } from './types/api.types';

const testRegistration = async () => {
    try {
        const createUser = await axios.post<CreateUserResponseBody>('http://localhost:3000/v1/register/create', {
            username: 'test',
            password: 'blah',
            confirmPassword: 'blah',
        });

        if (createUser.data.success) {
            console.log(createUser.data.message);
        }
    } catch (err) {
        if (axios.isAxiosError<CreateUserResponseBody>(err)) {
            if (err.response?.data.message === APIErrorMessages.SERVER_COULD_NOT_HANDLE) {
                console.log('FAILED BECAUSE SERVER COULDNT HANDLE');
            }
            if (err.response?.data.message === RegistrationErrorMessages.DUPLICATE_USER) {
                console.log('USER ALREADY EXISTS');
            }
        }
    }
};

testRegistration();