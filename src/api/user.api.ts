import UserInterface from '../interfaces/user.interface.ts';
import { users } from '../static.data.ts';
import { LoginInformation, LoginInterface } from '../interfaces/login.interface.ts';

const getUserInformation = async (): Promise<UserInterface> => {
    return { ...users[0] };
};

const loginUser = async (data: LoginInformation): Promise<LoginInterface> => {
    console.log('Data for login', data);
    return {
        user: { ...users[0] },
        token: 'Mon-Super-Token',
    };
};

export {
    getUserInformation,
    loginUser,
};