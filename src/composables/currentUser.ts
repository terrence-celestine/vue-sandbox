import type { InjectionKey } from 'vue';
import type { CurrentUser } from '../types/user';

export const currentUserKey: InjectionKey<CurrentUser> = Symbol('currentUser');