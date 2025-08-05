"use client"

import { signOut, useSession } from "next-auth/react"
import { BadgeCheck, Bell, ChevronsUpDown, LogOut, Settings, User } from "lucide-react"
import { useRouter } from "next/navigation"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { getInitials } from "@/lib/utils"

export function HeaderProfile() {
    const { data: session, status } = useSession()
    const router = useRouter()

    // Отладочная информация
    console.log('HeaderProfile - Status:', status)
    console.log('HeaderProfile - Session:', session)
    console.log('HeaderProfile - User name:', session?.user?.name)

    // Показываем компонент только если пользователь аутентифицирован
    if (status !== "authenticated" || !session) {
        console.log('HeaderProfile - Not authenticated, returning null')
        return null
    }

    const handleLogout = async () => {
        try {
            await fetch('/api/auth/logout', { method: 'GET' });
        } catch (e) {
            console.error('Logout error:', e);
        }
        await signOut({ callbackUrl: '/' });
    }

    const handleProfileClick = () => {
        router.push('/profile');
    }

    const initials = getInitials(session?.user?.name || "")
    console.log('HeaderProfile - Initials:', initials)

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="relative h-8 w-8 rounded-full p-0">
                    <Avatar className="h-8 w-8">
                        <AvatarImage
                            src={`https://ui-avatars.com/api/?name=${encodeURIComponent(session?.user?.name || '')}&background=6366f1&size=32&color=fff&bold=true`}
                            alt={session?.user?.name || ""}
                        />
                    </Avatar>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">{session?.user?.name || "Пользователь"}</p>
                        <p className="text-xs leading-none text-muted-foreground">
                            {session?.user?.email || ""}
                        </p>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem onClick={handleProfileClick}>
                        <User className="mr-2 h-4 w-4" />
                        <span>Профиль</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <BadgeCheck className="mr-2 h-4 w-4" />
                        <span>Аккаунт</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <Bell className="mr-2 h-4 w-4" />
                        <span>Уведомления</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <Settings className="mr-2 h-4 w-4" />
                        <span>Настройки</span>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Выйти</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
} 