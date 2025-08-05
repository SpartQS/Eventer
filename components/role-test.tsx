"use client"

import { useUserRole } from "@/hooks/useUserRole"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Crown, User, Users, Loader2 } from "lucide-react"

export function RoleTest() {
    const { userRole, isRoleLoaded, status, isAdmin, isUser, isOrganizer } = useUserRole()

    if (!isRoleLoaded || status === "loading") {
        return (
            <Card className="w-full max-w-md mx-auto">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Loader2 className="h-5 w-5 animate-spin" />
                        Загрузка роли...
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-sm text-muted-foreground">
                        Определяем роль пользователя...
                    </p>
                </CardContent>
            </Card>
        )
    }

    const getRoleInfo = () => {
        if (isAdmin) {
            return {
                label: "Администратор",
                icon: Crown,
                color: "destructive",
                description: "Полный доступ ко всем функциям системы"
            }
        }
        if (isOrganizer) {
            return {
                label: "Организатор",
                icon: Users,
                color: "secondary",
                description: "Управление мероприятиями и командами"
            }
        }
        if (isUser) {
            return {
                label: "Пользователь",
                icon: User,
                color: "default",
                description: "Базовый доступ к мероприятиям"
            }
        }
        return {
            label: userRole || "Неизвестная роль",
            icon: User,
            color: "outline",
            description: "Роль не определена"
        }
    }

    const roleInfo = getRoleInfo()
    const IconComponent = roleInfo.icon

    return (
        <Card className="w-full max-w-md mx-auto">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <IconComponent className="h-5 w-5" />
                    Информация о роли
                </CardTitle>
                <CardDescription>
                    Текущая роль пользователя в системе
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">Роль:</span>
                    <Badge variant={roleInfo.color as any}>
                        <IconComponent className="h-3 w-3 mr-1" />
                        {roleInfo.label}
                    </Badge>
                </div>

                <div>
                    <span className="text-sm font-medium">Описание:</span>
                    <p className="text-sm text-muted-foreground mt-1">
                        {roleInfo.description}
                    </p>
                </div>

                <div>
                    <span className="text-sm font-medium">Статус аутентификации:</span>
                    <p className="text-sm text-muted-foreground mt-1">
                        {status === "authenticated" ? "Аутентифицирован" : "Не аутентифицирован"}
                    </p>
                </div>

                <div>
                    <span className="text-sm font-medium">Флаги ролей:</span>
                    <div className="flex gap-2 mt-1">
                        <Badge variant={isAdmin ? "destructive" : "outline"}>
                            Админ: {isAdmin ? "Да" : "Нет"}
                        </Badge>
                        <Badge variant={isOrganizer ? "secondary" : "outline"}>
                            Организатор: {isOrganizer ? "Да" : "Нет"}
                        </Badge>
                        <Badge variant={isUser ? "default" : "outline"}>
                            Пользователь: {isUser ? "Да" : "Нет"}
                        </Badge>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
} 