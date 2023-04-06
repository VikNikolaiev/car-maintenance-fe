import { action, makeObservable, observable, runInAction } from 'mobx';
import AuthorizationService from 'src/services/AuthorizationService';
import User from '../types/User';

export default class Authorization {
    user: User | null;

    constructor(user: User | null) {
        makeObservable(this, {
            user: observable,
            logOut: action.bound,
        });
        this.user = user;
    }

    loadUserFromStorage() {
        const user = AuthorizationService.loadUserFromStorage();

        if (user) {
            this.user = user;
        }
    }

    saveUserToStorage(user: User) {
        if (user) {
            this.user = user;
        }

        AuthorizationService.saveUserToStorage(user);
    }

    async getUserByEmail(email: string) {
        const user = await AuthorizationService.getUserByEmail(email);

        if (user) {
            this.saveUserToStorage(user);
            return user;
        }

        return null;
    }

    async createUser(email: string, fullName: string) {
        const createdUser = await AuthorizationService.createUser(
            email,
            fullName,
        );

        this.saveUserToStorage(createdUser);
    }

    logOut() {
        localStorage.removeItem('user');
        runInAction(() => {
            this.user = null;
        });
    }
}
