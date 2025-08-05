"use client"

import { Badge } from "@/components/ui/badge"
import { useUserRole } from "@/hooks/useUserRole"
import { Crown, User, Users } from "lucide-react"

export function RoleIndicator() {
    const { userRole, isRoleLoaded, isAdmin, isUser, isOrganizer } = useUserRole()

    if (!isRoleLoaded || !userRole) {
        return null
    }

    const getRoleInfo = () => {
        if (isAdmin) {
            return {
                label: "Администратор",
                icon: Crown,
                variant: "destructive" as const
            }
        }
        if (isOrganizer) {
            return {
                label: "Организатор",
                icon: Users,
                variant: "secondary" as const
            }
        }
        if (isUser) {
            return {
                label: "Пользователь",
                icon: User,
                variant: "default" as const
            }
        }
        return {
            label: userRole,
            icon: User,
            variant: "outline" as const
        }
    }

    const roleInfo = getRoleInfo()
    const IconComponent = roleInfo.icon

    return (
        <div className="flex items-center gap-2 px-3 py-2">
            <Badge variant={roleInfo.variant} className="text-xs">
                <IconComponent className="h-3 w-3 mr-1" />
                {roleInfo.label}
            </Badge>
        </div>
    )
} 