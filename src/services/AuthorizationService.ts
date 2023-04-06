import User from 'src/types/User';
import { client } from 'src/utils/fetchClient';

export default class AuthorizationService {
    static loadUserFromStorage() {
        const userData = localStorage.getItem('user');

        if (!userData) {
            return null;
        }

        try {
            const user: User = JSON.parse(userData) as User;

            // eslint-disable-next-line consistent-return
            return user;
        } catch (error) {
            // eslint-disable-next-line consistent-return
        }

        // eslint-disable-next-line consistent-return
        return null;
    }

    static saveUserToStorage(user: User) {
        try {
            localStorage.setItem('user', JSON.stringify(user));
        } catch (error) {
            //
        }
    }

    static getUserByEmail(email: string) {
        return client
            .get<User>(`auth/login?Email=${email}`)
            .then((response) => response)
            .catch(() => null);
    }

    static createUser(email: string, fullName: string) {
        return client.post<User>('auth/register', { email, fullName });
    }
}
