'use client';

import type React from "react"
import { Gamepad2, Laptop, Cpu, Copy } from "lucide-react"
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { useSession } from "next-auth/react"
import { useQuery } from "@tanstack/react-query";
import { apiUsers, TopCategoriesResponse } from "@/app/api/http/users/users";

const STATS = [
    {
        icon: <Laptop className="size-7" />,
        label: "Хакатон",
        value: 15,
    },
    {
        icon: <Gamepad2 className="size-7" />,
        label: "Киберспорт",
        value: 4,
    },
    {
        icon: <Cpu className="size-7" />,
        label: "Алгоритмы",
        value: 8,
    },
] as const;

interface ProfileInfo {
    label: string
    value: string
}

export function ProfileCard() {
    const { data: session } = useSession()

    if (!session) {
        return <div>Пользователь не авторизован</div>
    }

    const { data: categories, error, isPending } = useQuery<TopCategoriesResponse>({
        queryKey: ['events'],
        queryFn: () => apiUsers.getTopCategories()
    })

    console.log(categories)
    if (error) {
        console.log(error)
        // return <div>Не найдено мероприятий</div>
    }

    const info: ProfileInfo[] = [
        { label: "ID", value: session.user_id || '' },
        { label: "Роль", value: session.role || '' },
        { label: "Email", value: session.user?.email || '' },
    ]

    const handleCopyId = () => {
        if (!session.user_id) return;

        const copyToClipboard = () => {
            navigator.clipboard.writeText(session.user_id)
            toast("ID скопирован", {
                description: `ID: ${session.user_id} скопирован в буфер обмена`,
                action: {
                    label: "Скопировать",
                    onClick: copyToClipboard,
                },
            })
        }

        copyToClipboard()
    }

    return (
        <Card className="w-full max-w-[500px] bg-card text-card-foreground border-border shadow-sm mx-auto md:mx-0">
            <CardHeader className="flex flex-row items-center gap-4 p-4 sm:p-6 justify-between">
                <Avatar className="h-20 w-20 md:h-24 md:w-24 rounded-full border-2 border-border shrink-0">
                    <AvatarImage
                        src={`https://ui-avatars.com/api/?name=${encodeURIComponent(session.user?.name || '')}&background=6366f1&size=96&color=fff&bold=true`}
                        alt="Profile picture"
                    />
                </Avatar>
                <div className="flex flex-col flex-1 min-w-0 w-full">
                    <div className="flex justify-between items-start w-full gap-2">
                        <div className="min-w-0 flex flex-col gap-1">
                            <h2 className="text-xl md:text-2xl font-semibold text-foreground mt-2 md:mt-4 truncate">{session.user?.name || 'Пользователь'}</h2>
                            <p className="text-base md:text-lg text-muted-foreground mt-1">{session.user?.email || 'Нет email'}</p>
                            <div className="flex items-center gap-2 mt-1 w-fit">
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="h-8 px-2 hover:bg-accent hover:text-accent-foreground"
                                    onClick={handleCopyId}
                                >
                                    <Badge variant="outline" className="text-xs font-normal border-border whitespace-nowrap flex items-center gap-1">
                                        ID: {session.user_id ? `${session.user_id.substring(0, 8)}...` : 'Нет ID'}
                                        <Copy className="h-3 w-3" />
                                    </Badge>
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="p-0">
                <div className="px-4 sm:px-6 py-4">
                    <h3 className="text-lg md:text-xl font-medium mb-4 text-foreground">Участвовал</h3>
                    <div className="flex flex-row justify-between gap-4 md:gap-2">
                        {categories && categories['top-categories'].map((stat, index) => (
                            <div key={index} className="flex flex-col items-center">
                                <div className="mb-2 text-muted-foreground"><Cpu className="size-7" /></div>
                                <span className="text-base text-muted-foreground truncate">{stat.category.name}</span>
                                <span className="text-lg font-bold text-foreground">{stat.count}</span>
                            </div>
                        ))}
                    </div>
                </div>
                <Separator className="bg-border my-4" />
                <div className="px-4 sm:px-6 pb-6">
                    <h3 className="text-lg md:text-xl font-medium mb-4 text-foreground">Информация</h3>
                    <div className="space-y-3">
                        {info.map((item, index) => (
                            <div key={index} className="flex items-center">
                                <span className="text-base text-muted-foreground w-24 shrink-0">{item.label}:</span>
                                <span className="text-base text-foreground ml-2">{item.value}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}