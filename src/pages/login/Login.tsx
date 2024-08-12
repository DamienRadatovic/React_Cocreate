import './Login.css';
import { useAuth } from '@/contexts/auth.context.tsx';
import { LoginInformation } from '@/interfaces/login.interface.ts';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';

const Login = () => {
    const navigate: NavigateFunction = useNavigate();
    const { loginAction, isAuthenticated } = useAuth();
    const [user, setUser] = useState<LoginInformation>({
        username: '',
        password: '',
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setUser({
            ...user,
            [name]: value,
        });
    };

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/');
        }
    });

    const handleSubmit = async (e: FormEvent): Promise<void> => {
        e.preventDefault();
        await loginAction(user);
        navigate('/');
    };
    
    return (
        <div className="login-container">
            <form onSubmit={handleSubmit}>
                <h2>Login</h2>
                <div className="form-block">
                    <label>Username:</label>
                    <input
                        type="text"
                        name="username"
                        placeholder="Username"
                        value={user.username}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-block">
                    <label>Password:</label>
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={user.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit">LOGIN</button>
            </form>
        </div>
    );
};

export default Login;
