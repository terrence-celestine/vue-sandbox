
import type { InjectionKey } from 'vue';

export interface CurrentUser {
    name: string;
    email: string;
}

export const currentUserKey: InjectionKey<CurrentUser> = Symbol('currentUser');