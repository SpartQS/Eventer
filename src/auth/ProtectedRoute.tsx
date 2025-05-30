import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { useEffect } from 'react';

export const ProtectedRoute = () => {
    const { isAuthenticated, isLoading } = useAuth();
    const location = useLocation();

    useEffect(() => {
        if (!isLoading && !isAuthenticated) {
            sessionStorage.setItem('redirectPath', location.pathname);
        }
    }, [isLoading, isAuthenticated, location]);

    if (isLoading) {
        return (
            <div className="fixed inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm">
                <div className="text-2xl font-semibold text-foreground animate-pulse">
                    Загрузка...
                </div>
            </div>
        );
    }

    if (!isAuthenticated) {
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
};