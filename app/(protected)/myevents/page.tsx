'use client';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { CalendarIcon, Laptop, BrainCircuit, Globe, Smartphone, Shield } from "lucide-react"
import { parse, isValid } from "date-fns"
import { ru } from "date-fns/locale"
import { Badge } from "@/components/ui/badge"
import { useRouter } from "next/navigation"
import { RoleGuard } from "@/components/role-guard"
import { useQuery } from "@tanstack/react-query"
import { apiEvents } from "@/app/api/http/event/events"

interface Event {
    id: number
    title: string
    description: string
    date: string
    type: "hackathon" | "algorithms" | "web" | "mobile" | "security"
    status: "active" | "upcoming" | "completed"
}

export default function MyEvents() {
    const router = useRouter()
    const [selectedType, setSelectedType] = useState<string>("all")
    const [selectedStatus, setSelectedStatus] = useState<string>("all")
    const [date, setDate] = useState<string>("")

    const { data, isPending, error } = useQuery({
        queryKey: ["my_events"],
        queryFn: () => apiEvents.getMyEvents(),
    })

    const events = (data?.events || []).map((event) => ({
        id: event.id,
        title: event.event_name,
        description: event.description,
        date: new Date(event.start_date).toLocaleDateString("ru-RU", { day: "2-digit", month: "long", year: "numeric" }) +
            " в " + new Date(event.start_date).toLocaleTimeString("ru-RU", { hour: "2-digit", minute: "2-digit" }),
        type: (event as any).category?.name || event.format || "hackathon",
        status: event.event_status,
    }))

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

    const getEventTypeIcon = (type: string) => {
        const iconProps = { className: "w-12 h-12 text-muted-foreground" };
        switch (type) {
            case "hackathon":
                return <Laptop {...iconProps} />;
            case "algorithms":
                return <BrainCircuit {...iconProps} />;
            case "web":
                return <Globe {...iconProps} />;
            case "mobile":
                return <Smartphone {...iconProps} />;
            case "security":
                return <Shield {...iconProps} />;
            default:
                return <Laptop {...iconProps} />;
        }
    };

    const getTypeTranslation = (type: string) => {
        switch (type) {
            case "hackathon": return "Хакатон";
            case "algorithms": return "Алгоритмы";
            case "web": return "Web-разработка";
            case "mobile": return "Mobile-разработка";
            case "security": return "Кибербезопасность";
            default: return "Мероприятие";
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

    if (isPending) {
        return <div className="p-8 text-center">Загрузка...</div>
    }
    if (error) {
        return <div className="p-8 text-center text-red-500">Ошибка загрузки данных</div>
    }

    return (
        <RoleGuard>
            <div className="min-h-screen bg-background">
                <div className="container mx-auto max-w-7xl px-2 sm:px-4 md:px-8">
                    <div className="flex flex-col h-full p-2 sm:p-4 md:p-8">
                        <div className="flex flex-col gap-4 sm:gap-6 mb-4 sm:mb-8">
                            <h1 className="text-xl sm:text-2xl font-bold">Мои мероприятия</h1>
                            <div className="flex flex-col gap-2 sm:flex-row sm:gap-4">
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

                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                            {filteredEvents.map((event, idx) => (
                                <Card key={event.id ?? idx} className="bg-background border border-border rounded-xl shadow-lg flex flex-col min-h-[260px] h-full p-5">
                                    <div className="flex flex-col flex-1">
                                        <div className="flex items-center justify-between mb-2">
                                            <div className="flex items-center gap-4 min-w-[48px]">
                                                <span className="flex items-center justify-center w-10 h-10">
                                                    {getEventTypeIcon(event.type)}
                                                </span>
                                                <CardTitle className="text-base md:text-lg font-bold break-words line-clamp-2 mr-2 text-white max-w-[180px]">{event.title}</CardTitle>
                                            </div>
                                            {getStatusBadge(event.status)}
                                        </div>
                                        <div className="text-xs text-muted-foreground mb-2">{event.date}</div>
                                        <div className="text-xs sm:text-sm text-gray-300 break-words line-clamp-3 mb-3">{event.description}</div>
                                        <div className="flex-1" />
                                    </div>
                                    <CardFooter className="p-0 mt-1">
                                        <Button
                                            variant="outline"
                                            className="w-full border border-gray-500 bg-transparent text-white hover:bg-gray-800 hover:text-white text-sm rounded-lg font-bold"
                                            onClick={() => router.push(`/myevents/event/${event.id}`)}
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
        </RoleGuard>
    )
} 