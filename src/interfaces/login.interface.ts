import UserInterface from '@/interfaces/user.interface.ts';

interface LoginInterface {
    user: UserInterface,
    token: string,
}

interface LoginInformation {
    username: string,
    password: string,
}

export type {
    LoginInterface,
    LoginInformation
};