import { Check, X, Bell } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

interface NotificationItem {
    id: number
    message: string
    time: string
    inviter: string
    event: string
}

interface EventItem {
    team: string
    event: string
    stage: string
}

export function NotificationsEvents() {
    const notifications: NotificationItem[] = [
        {
            id: 1,
            message: "Вас пригласил Данил Громов в Хакатон",
            time: "20:11",
            inviter: "Данил Громов",
            event: "Хакатон",
        },
        {
            id: 2,
            message: "Вас пригласил Данил Громов в Алгоритмы",
            time: "22:11",
            inviter: "Данил Громов",
            event: "Алгоритмы",
        },
    ]

    const currentEvents: EventItem[] = [
        {
            team: "Horizon",
            event: "Хакатон",
            stage: "Стадия 1",
        },
        {
            team: "Fly",
            event: "Хакатон",
            stage: "Стадия 2",
        },
    ]

    const handleAccept = (id: number) => {
        console.log(`Accepted invitation ${id}`)
    }

    const handleDecline = (id: number) => {
        console.log(`Declined invitation ${id}`)
    }

    return (
        <div className="h-full flex flex-col">
            {/* Notifications Section */}
            <Card className="bg-white border border-gray-200 flex-1 mb-6">
                <CardHeader className="pb-4">
                    <CardTitle className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                        <Bell className="h-5 w-5" />
                        Рассылка
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 h-[calc(100%-60px)] overflow-y-auto">
                    {notifications.map((notification) => (
                        <div
                            key={notification.id}
                            className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-100"
                        >
                            <div className="flex-1">
                                <p className="text-gray-900 text-sm">
                                    {notification.message} <span className="text-gray-500">{notification.time}</span>
                                </p>
                            </div>
                            <div className="flex items-center gap-2 ml-4">
                                <Button
                                    size="sm"
                                    variant="outline"
                                    className="h-8 w-8 p-0 border-green-200 hover:bg-green-50"
                                    onClick={() => handleAccept(notification.id)}
                                >
                                    <Check className="h-4 w-4 text-green-600" />
                                </Button>
                                <Button
                                    size="sm"
                                    variant="outline"
                                    className="h-8 w-8 p-0 border-red-200 hover:bg-red-50"
                                    onClick={() => handleDecline(notification.id)}
                                >
                                    <X className="h-4 w-4 text-red-600" />
                                </Button>
                            </div>
                        </div>
                    ))}
                </CardContent>
            </Card>

            {/* Current Events Section */}
            <Card className="bg-white border border-gray-200 flex-1">
                <CardHeader className="pb-4">
                    <CardTitle className="text-xl font-semibold text-gray-900">Текущие мероприятия</CardTitle>
                </CardHeader>
                <CardContent className="h-[calc(100%-60px)] overflow-y-auto">
                    <Table>
                        <TableHeader>
                            <TableRow className="border-gray-200">
                                <TableHead className="text-gray-700 font-medium">Команда</TableHead>
                                <TableHead className="text-gray-700 font-medium">Мероприятие</TableHead>
                                <TableHead className="text-gray-700 font-medium">Этап</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {currentEvents.map((event, index) => (
                                <TableRow key={index} className="border-gray-100 hover:bg-gray-50">
                                    <TableCell className="font-medium text-gray-900">{event.team}</TableCell>
                                    <TableCell className="text-gray-700">
                                        <Badge variant="secondary" className="bg-blue-100 text-blue-800 hover:bg-blue-100">
                                            {event.event}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-gray-700">{event.stage}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    )
} 