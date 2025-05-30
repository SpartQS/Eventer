import type React from "react"
import { Mail, Edit2, Gamepad2, Laptop, Cpu, Copy } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { useUserData } from "@/hooks/useUserData"

interface ProfileStat {
    icon: React.ReactNode
    label: string
    value: number
}

interface ProfileInfo {
    label: string
    value: string
}

export function ProfileCard() {
    const userData = useUserData()

    const stats: ProfileStat[] = [
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
    ]

    const info: ProfileInfo[] = [
        { label: "ID", value: userData.id },
        { label: "Роли", value: userData.roles.join(", ") },
        { label: "Статус", value: "Активен" },
        { label: "Имя пользователя", value: userData.username || "" },
    ]

    const handleCopyId = () => {
        navigator.clipboard.writeText(userData.id)
        toast("ID скопирован", {
            description: `ID: ${userData.id} скопирован в буфер обмена`,
            action: {
                label: "Скопировать",
                onClick: () => {
                    navigator.clipboard.writeText(userData.id)
                    toast("ID скопирован повторно")
                },
            },
        })
    }

    return (
        <Card className="w-[500px] bg-card text-card-foreground border-border shadow-sm">
            <CardHeader className="flex flex-row items-start gap-4 p-6">
                <Avatar className="h-24 w-24 rounded-full border-2 border-border shrink-0">
                    <AvatarImage
                        src={userData.avatar || "https://github.com/shadcn.png"}
                        alt="Profile picture"
                    />
                    <AvatarFallback className="bg-muted text-muted-foreground">
                        {userData.firstName?.[0]}{userData.lastName?.[0]}
                    </AvatarFallback>
                </Avatar>
                <div className="flex flex-col flex-1 min-w-0">
                    <div className="flex justify-between items-start">
                        <div className="min-w-0">
                            <h2 className="text-2xl font-semibold text-foreground mt-4">{userData.name}</h2>
                            <p className="text-lg text-muted-foreground mt-1">{userData.email}</p>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                            <Button
                                variant="ghost"
                                size="sm"
                                className="h-8 px-2 hover:bg-accent hover:text-accent-foreground"
                                onClick={handleCopyId}
                            >
                                <Badge variant="outline" className="text-xs font-normal border-border whitespace-nowrap flex items-center gap-1">
                                    ID: {userData.id}
                                    <Copy className="h-3 w-3" />
                                </Badge>
                            </Button>
                        </div>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="p-0">
                <div className="px-6 py-4">
                    <h3 className="text-xl font-medium mb-4 text-foreground">Участвовал</h3>
                    <div className="flex justify-between">
                        {stats.map((stat, index) => (
                            <div key={index} className="flex flex-col items-center">
                                <div className="mb-2 text-muted-foreground">{stat.icon}</div>
                                <span className="text-base text-muted-foreground truncate">{stat.label}</span>
                                <span className="text-lg font-bold text-foreground">{stat.value}</span>
                            </div>
                        ))}
                    </div>
                </div>
                <Separator className="bg-border my-4" />
                <div className="px-6 pb-6">
                    <h3 className="text-xl font-medium mb-4 text-foreground">Информация</h3>
                    <div className="space-y-3">
                        {info.map((item, index) => (
                            <div key={index} className="flex items-center">
                                <span className="text-base text-muted-foreground w-24 shrink-0">{item.label}:</span>
                                {item.label === "Статус" ? (
                                    <Badge variant="secondary" className="text-base bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100 hover:bg-green-100 dark:hover:bg-green-900">
                                        {item.value}
                                    </Badge>
                                ) : (
                                    <span className="text-base text-foreground ml-2">{item.value}</span>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </CardContent>
        </Card>
    )
} 