import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { useKeycloak } from '@react-keycloak/web';

interface AuthContextType {
    isAuthenticated: boolean;
    isLoading: boolean;
    user: {
        name: string;
        email: string;
    } | null;
    checkAuth: () => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType>({
    isAuthenticated: false,
    isLoading: true,
    user: null,
    checkAuth: async () => false,
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { keycloak, initialized } = useKeycloak();
    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState<AuthContextType['user']>(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const checkAuth = useCallback(async (): Promise<boolean> => {
        if (!initialized) return false;

        try {
            // Проверяем, есть ли токен и не истек ли он
            const isAuth = Boolean(keycloak.authenticated && !keycloak.isTokenExpired());
            setIsAuthenticated(isAuth);

            if (isAuth && !user) {
                const userInfo = await keycloak.loadUserInfo();
                setUser({
                    name: (userInfo as any).name || 'Пользователь',
                    email: (userInfo as any).email || '',
                });
            }

            return isAuth;
        } catch (error) {
            console.error('Auth check failed:', error);
            return false;
        }
    }, [initialized, keycloak, user]);

    useEffect(() => {
        if (initialized) {
            checkAuth().finally(() => {
                setIsLoading(false);
            });
        }
    }, [initialized, checkAuth]);

    const value: AuthContextType = {
        isAuthenticated,
        isLoading,
        user,
        checkAuth,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext); 