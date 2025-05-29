import { Navigate, Outlet } from 'react-router-dom';
import { useKeycloak } from '@react-keycloak/web';

export const ProtectedRoute = () => {
    const { keycloak, initialized } = useKeycloak();

    if (!initialized) {
        return (
            <div className="fixed inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm">
                <div className="text-2xl font-semibold text-foreground animate-pulse">
                    Загрузка...
                </div>
            </div>
        );
    }

    if (!keycloak.authenticated) {
        return <Navigate to="/" replace />;
    }
    return <Outlet />;
};