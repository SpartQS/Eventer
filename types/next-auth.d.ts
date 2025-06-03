import 'next-auth';

declare module 'next-auth' {
    interface Session {
        user_id: string;
        role: string;
        access_token: string;
        id_token: string;
        error?: string;
    }
} 