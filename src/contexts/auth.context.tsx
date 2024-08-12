import { createContext, ReactNode, useContext, useState } from 'react';
import { getUserInformation, loginUser } from '@/api/user.api.ts';
import UserInterface from '@/interfaces/user.interface.ts';
import { LoginInformation } from '@/interfaces/login.interface.ts';

interface AuthContextType {
    user: UserInterface|null,
    token: string|null,
    isAuthenticated: boolean,
    loginAction: (data: LoginInformation) => Promise<void>,
    logOut: () => void,
    getToken: () => void,
    fetchUserInformation: () => void,
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<UserInterface|null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
        return Boolean(localStorage.getItem('site'));
    });
    const [token, setToken] = useState<string>(localStorage.getItem('site') || '');

    const getToken = () => {
        const token = localStorage.getItem('site');

        if (token !== null) {
            setIsAuthenticated(true);
        } else {
            setIsAuthenticated(false);
        }
    };

    const loginAction = async (data: LoginInformation): Promise<void> => {
        try {
            loginUser(data).then((response) => {
                setUser(response.user);
                setToken(response.token);
                localStorage.setItem('site', response.token);
                setIsAuthenticated(true);
            });
        } catch (err) {
            console.error(err);
        }
    };

    const logOut = (): void => {
        setUser(null);
        setToken('');
        localStorage.removeItem('site');
        setIsAuthenticated(false);
    };

    const fetchUserInformation = (): void => {
        getUserInformation().then((response: UserInterface) => {
            setUser(response);
        });
    };
    
    return <>
        <AuthContext.Provider value={{
            user,
            token,
            isAuthenticated,
            loginAction,
            logOut,
            getToken,
            fetchUserInformation,
        }}>
            { children }
        </AuthContext.Provider>
    </>;
};

export default AuthProvider;

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};