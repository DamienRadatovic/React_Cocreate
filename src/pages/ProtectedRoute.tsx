import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/auth.context.tsx';
import { ReactElement, useEffect } from 'react';

export const ProtectedRoute = ({ element }: { element: ReactElement }) => {
    const { isAuthenticated, fetchUserInformation } = useAuth();

    useEffect(() => {
        fetchUserInformation();
    }, []);

    return isAuthenticated ? element : <Navigate to="/login" replace/>;
};