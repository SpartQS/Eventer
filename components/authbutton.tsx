'use client';

import { Button } from "@/components/ui/button";
import { signIn } from 'next-auth/react';

export function AuthButton() {
    const handleLogin = async () => {
        await signIn('keycloak', {
            callbackUrl: '/profile',
        });
    };

    return (
        <Button
            size="lg"
            className="relative bg-card text-card-foreground hover:bg-accent hover:text-accent-foreground border border-white/30 w-64 h-16 text-2xl font-bold transition-all duration-300 hover:scale-105"
            onClick={handleLogin}
        >
            Авторизация
        </Button>
    );
}