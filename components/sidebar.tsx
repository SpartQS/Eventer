'use client';

import Link from 'next/link';
import { useApiLogout } from '@/app/api/query-client';
import { signOut } from 'next-auth/react';

import { Button } from '@/components/ui/button';
import { Home, LogOut } from 'lucide-react';

export const Sidebar = () => {
    const { mutate } = useApiLogout();

    const handleLogout = async (): Promise<void> => {
        try {
            await fetch('/api/auth/logout', { method: 'GET' });
        } catch (e) {
            // Можно добавить обработку ошибки, если нужно
        }
        await signOut({ callbackUrl: '/login' });
    };

    return (
        <aside className="hidden md:flex h-screen w-64 bg-white/10 backdrop-blur-lg border-r border-white/20 p-4 flex-col gap-4">
            <h2 className="text-xl font-bold text-white">Dashboard</h2>
            <nav className="flex flex-col gap-2">
                <Link
                    href="/dashboard"
                    className="flex items-center gap-2 text-white/70 hover:text-white transition-colors"
                >
                    <Home size={20} />
                    <span>Главная</span>
                </Link>
            </nav>
            <div className="mt-auto">
                <Button
                    variant="destructive"
                    className="w-full flex items-center gap-2"
                    onClick={handleLogout}
                >
                    <LogOut size={20} /> Выйти
                </Button>
            </div>
        </aside>
    );
}; 