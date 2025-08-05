"use client"

import { useSession } from "next-auth/react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { getInitials } from "@/lib/utils"

export function AvatarTest() {
    const { data: session, status } = useSession()

    console.log('AvatarTest - Status:', status)
    console.log('AvatarTest - Session:', session)
    console.log('AvatarTest - User name:', session?.user?.name)

    if (status === "loading") {
        return <div>Загрузка...</div>
    }

    if (status !== "authenticated" || !session) {
        return <div>Не аутентифицирован</div>
    }

    const initials = getInitials(session?.user?.name || "")
    console.log('AvatarTest - Initials:', initials)

    return (
        <div className="flex items-center gap-4 p-4 border rounded">
            <div>
                <h3 className="font-medium">Тест аватара:</h3>
                <p>Имя: {session?.user?.name || "Не указано"}</p>
                <p>Email: {session?.user?.email || "Не указан"}</p>
                <p>Инициалы: {initials}</p>
            </div>
            <Avatar className="h-12 w-12">
                <AvatarImage
                    src={`https://ui-avatars.com/api/?name=${encodeURIComponent(session?.user?.name || '')}&background=6366f1&size=48&color=fff&bold=true`}
                    alt={session?.user?.name || ""}
                />
            </Avatar>
        </div>
    )
} 