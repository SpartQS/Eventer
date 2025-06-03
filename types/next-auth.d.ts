import 'next-auth';
import { JwtPayload } from 'jwt-decode';

declare module 'jwt-decode' {
    interface JwtPayload {
        resource_access?: {
            [key: string]: {
                roles: string[];
            };
        };
        realm_access?: {
            roles: string[];
        };
        email_verified?: boolean;
        name?: string;
        preferred_username?: string;
        given_name?: string;
        family_name?: string;
        email?: string;
    }
}

declare module 'next-auth' {
    interface Session {
        user_id: string;
        role: string;
        access_token: string;
        id_token: string;
        error?: string;
    }
} 