import { Check, X, Bell } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface NotificationItem {
    id: number
    message: string
    time: string
    inviter: string
    event: string
}

export function Notifications() {
    const notifications: NotificationItem[] = [
        {
            id: 1,
            message: "Команда Horizon приглашает вас присоединиться к хакатону",
            time: "2 часа назад",
            inviter: "Horizon",
            event: "Хакатон",
        },
        {
            id: 2,
            message: "Команда Fly приглашает вас присоединиться к киберспорту",
            time: "3 часа назад",
            inviter: "Fly",
            event: "Киберспорт",
        },
    ]

    const handleAccept = (id: number) => {
        console.log(`Accepted invitation ${id}`)
    }

    const handleDecline = (id: number) => {
        console.log(`Declined invitation ${id}`)
    }

    return (
        <Card className="bg-card text-card-foreground border-border h-[450px] flex-1">
            <CardHeader className="pb-4">
                <CardTitle className="text-2xl font-semibold text-foreground flex items-center gap-2">
                    <Bell className="h-6 w-6" />
                    Рассылка
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 h-[calc(100%-60px)] overflow-y-auto">
                {notifications.map((notification) => (
                    <div
                        key={notification.id}
                        className="flex items-center justify-between p-4 bg-muted/50 rounded-lg border border-border"
                    >
                        <div className="flex-1 min-w-0">
                            <p className="text-base text-foreground">
                                {notification.message} <span className="text-muted-foreground ml-2">{notification.time}</span>
                            </p>
                        </div>
                        <div className="flex items-center gap-2 ml-4">
                            <Button
                                variant="ghost"
                                size="icon"
                                className="h-9 w-9 hover:bg-green-100 dark:hover:bg-green-900"
                            >
                                <Check className="h-5 w-5 text-green-600 dark:text-green-400" />
                            </Button>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="h-9 w-9 hover:bg-red-100 dark:hover:bg-red-900"
                            >
                                <X className="h-5 w-5 text-red-600 dark:text-red-400" />
                            </Button>
                        </div>
                    </div>
                ))}
            </CardContent>
        </Card>
    )
} 