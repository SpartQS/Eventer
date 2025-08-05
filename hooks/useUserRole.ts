import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"

interface UseUserRoleReturn {
    userRole: string | null
    isRoleLoaded: boolean
    status: "loading" | "authenticated" | "unauthenticated"
    isAdmin: boolean
    isUser: boolean
    isOrganizer: boolean
}

/**
 * Хук для получения роли пользователя с загрузкой
 * Дожидается определения роли пользователя перед возвратом данных
 */
export function useUserRole(): UseUserRoleReturn {
    const { data: session, status } = useSession()
    const [isRoleLoaded, setIsRoleLoaded] = useState(false)
    const [userRole, setUserRole] = useState<string | null>(null)

    useEffect(() => {
        if (status === "authenticated" && session?.role) {
            setUserRole(session.role)
            setIsRoleLoaded(true)
        } else if (status === "unauthenticated") {
            setUserRole(null)
            setIsRoleLoaded(true)
        }
    }, [session, status])

    const isAdmin = userRole?.toUpperCase() === 'ADMIN'
    const isUser = userRole?.toUpperCase() === 'USER'
    const isOrganizer = userRole?.toUpperCase() === 'ORGANAIZER'

    return {
        userRole,
        isRoleLoaded,
        status,
        isAdmin,
        isUser,
        isOrganizer
    }
} 