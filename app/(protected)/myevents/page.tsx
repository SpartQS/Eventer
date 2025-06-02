'use client';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { CalendarIcon } from "lucide-react"
import { parse, isValid } from "date-fns"
import { ru } from "date-fns/locale"
import { Badge } from "@/components/ui/badge"
import { useRouter } from "next/navigation"

interface Event {
    id: number
    title: string
    description: string
    date: string
    type: "hackathon" | "algorithms" | "web" | "mobile" | "security"
    status: "active" | "upcoming" | "completed"
}

const events: Event[] = [
    {
        id: 1,
        title: "Хакатон",
        description: "Хакатон — это особый формат соревнования, где участники решают поставленную перед ними задачу за определенный срок. Качество и скорость выполнения задания — это два обязательных составляющих конкурса IT-специалистов.",
        date: "3 декабря 2025 в 08:00",
        type: "hackathon",
        status: "upcoming"
    },
    {
        id: 2,
        title: "Алгоритмы",
        description: "Соревнование по решению алгоритмических задач, где участники демонстрируют свои навыки в области структур данных и алгоритмов. Задачи различной сложности помогут проверить ваши знания и улучшить навыки программирования.",
        date: "15 января 2026 в 10:00",
        type: "algorithms",
        status: "active"
    },
    {
        id: 3,
        title: "Web-разработка",
        description: "Конкурс по созданию современных веб-приложений с использованием передовых технологий. Участники будут работать над реальными проектами и создавать инновационные решения для веб-платформ.",
        date: "28 февраля 2026 в 09:00",
        type: "web",
        status: "upcoming"
    },
    {
        id: 5,
        title: "Мобильная разработка",
        description: "Конкурс по разработке мобильных приложений для различных платформ. Участники создадут инновационные мобильные решения, используя современные технологии и фреймворки.",
        date: "5 апреля 2026 в 09:30",
        type: "mobile",
        status: "active"
    },
    {
        id: 6,
        title: "Кибербезопасность",
        description: "Соревнование по информационной безопасности, где участники будут решать задачи по защите систем, поиску уязвимостей и предотвращению кибератак. Практические кейсы от ведущих экспертов отрасли.",
        date: "20 мая 2026 в 10:00",
        type: "security",
        status: "upcoming"
    }
]

export default function MyEvents() {
    const router = useRouter()
    const [selectedType, setSelectedType] = useState<string>("all")
    const [selectedStatus, setSelectedStatus] = useState<string>("all")
    const [date, setDate] = useState<string>("")

    const parseEventDate = (dateStr: string) => {
        return parse(dateStr, "d MMMM yyyy 'в' HH:mm", new Date(), { locale: ru })
    }

    const parseUserDate = (dateStr: string) => {
        const parsedDate = parse(dateStr, "dd.MM.yyyy", new Date(), { locale: ru })
        return isValid(parsedDate) ? parsedDate : null
    }

    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.replace(/\./g, '')

        if (!/^\d*$/.test(value)) {
            return
        }

        let formattedValue = ''

        if (value.length > 0) {
            formattedValue += value.slice(0, 2)
            if (value.length > 2) {
                formattedValue += '.'
                formattedValue += value.slice(2, 4)
                if (value.length > 4) {
                    formattedValue += '.'
                    formattedValue += value.slice(4, 8)
                }
            }
        }

        if (formattedValue.length === 10) {
            const [day, month, year] = formattedValue.split('.')
            if (
                parseInt(day) > 31 ||
                parseInt(month) > 12 ||
                parseInt(year) < 2024 ||
                parseInt(year) > 2100
            ) {
                return
            }
        }

        setDate(formattedValue)
    }

    const getStatusBadge = (status: string) => {
        switch (status) {
            case "active":
                return <Badge className="bg-green-600 hover:bg-green-700">Активный</Badge>
            case "upcoming":
                return <Badge className="bg-blue-600 hover:bg-blue-700">Предстоящий</Badge>
            case "completed":
                return <Badge className="bg-gray-600 hover:bg-gray-700">Завершен</Badge>
            default:
                return <Badge variant="secondary">{status}</Badge>
        }
    }

    const filteredEvents = events.filter(event => {
        const matchesType = selectedType === "all" || event.type === selectedType
        const matchesStatus = selectedStatus === "all" || event.status === selectedStatus

        if (date) {
            const userDate = parseUserDate(date)
            if (userDate) {
                const eventDate = parseEventDate(event.date)
                if (
                    eventDate.getDate() !== userDate.getDate() ||
                    eventDate.getMonth() !== userDate.getMonth() ||
                    eventDate.getFullYear() !== userDate.getFullYear()
                ) {
                    return false
                }
            }
        }

        return matchesType && matchesStatus
    })

    return (
        <div className="min-h-screen bg-background">
            <div className="container mx-auto max-w-7xl">
                <div className="flex flex-col h-full p-8">
                    <div className="flex flex-col gap-6 mb-8">
                        <h1 className="text-2xl font-bold">Мои мероприятия</h1>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <Select value={selectedType} onValueChange={setSelectedType}>
                                <SelectTrigger className="w-[200px] bg-background">
                                    <SelectValue placeholder="Все мероприятия" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">Все мероприятия</SelectItem>
                                    <SelectItem value="hackathon">Хакатоны</SelectItem>
                                    <SelectItem value="algorithms">Алгоритмы</SelectItem>
                                    <SelectItem value="web">Web-разработка</SelectItem>
                                    <SelectItem value="mobile">Мобильная разработка</SelectItem>
                                    <SelectItem value="security">Кибербезопасность</SelectItem>
                                </SelectContent>
                            </Select>

                            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                                <SelectTrigger className="w-[200px] bg-background">
                                    <SelectValue placeholder="Все статусы" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">Все статусы</SelectItem>
                                    <SelectItem value="active">Активные</SelectItem>
                                    <SelectItem value="upcoming">Предстоящие</SelectItem>
                                    <SelectItem value="completed">Завершенные</SelectItem>
                                </SelectContent>
                            </Select>

                            <div className="relative w-[200px]">
                                <Input
                                    type="text"
                                    placeholder="ДД.ММ.ГГГГ"
                                    value={date}
                                    onChange={handleDateChange}
                                    className="pr-10"
                                />
                                <CalendarIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            </div>

                            {date && (
                                <Button
                                    variant="ghost"
                                    className="px-2 w-[100px]"
                                    onClick={() => setDate("")}
                                >
                                    Сбросить дату
                                </Button>
                            )}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredEvents.map((event) => (
                            <Card key={event.id} className="bg-background border border-border flex flex-col">
                                <CardHeader>
                                    <div className="flex justify-between items-start">
                                        <CardTitle className="text-xl">{event.title}</CardTitle>
                                        {getStatusBadge(event.status)}
                                    </div>
                                    <div className="text-sm text-muted-foreground">
                                        {event.date}
                                    </div>
                                </CardHeader>
                                <CardContent className="flex-1">
                                    <p className="text-sm text-muted-foreground line-clamp-6">
                                        {event.description}
                                    </p>
                                </CardContent>
                                <CardFooter className="mt-auto">
                                    <Button
                                        variant="outline"
                                        className="w-full hover:bg-accent hover:text-accent-foreground"
                                        onClick={() => router.push(`/eventdetails/${event.id}`)}
                                    >
                                        Подробнее
                                    </Button>
                                </CardFooter>
                            </Card>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
} 