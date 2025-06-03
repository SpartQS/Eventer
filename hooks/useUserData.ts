'use client';

import { useSession } from 'next-auth/react';

interface UserData {
    name: string;
    email: string;
    userId: string;
    roles: string[];
    expires: string;
    accessToken: string;
    idToken: string;
}

export const useUserData = (): UserData | null => {
    const { data: session } = useSession();
    //console.log(session)

    if (!session || !session.user) {
        return null;
    }


    return {
        name: session.user?.name || '',
        email: session.user?.email || '',
        userId: session.user_id || '',
        roles: session.roles || [],
        expires: session.expires || '',
        accessToken: session.access_token || '',
        idToken: session.id_token || '',
    };
};