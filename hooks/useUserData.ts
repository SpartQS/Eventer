'use client';

import { useSession } from 'next-auth/react';

interface UserData {
    id: string;
    name: string;
    email: string;
    firstName?: string;
    lastName?: string;
    username?: string;
    avatar?: string;
    roles: string[];
}

export function useUserData(): UserData {
    const { data: session } = useSession();

    return {
        id: session?.user?.id || 'N/A',
        name: session?.user?.name || 'Гость',
        email: session?.user?.email || 'N/A',
        firstName: session?.user?.firstName,
        lastName: session?.user?.lastName,
        username: session?.user?.username,
        avatar: session?.user?.image,
        roles: session?.user?.roles || [],
    };
} 