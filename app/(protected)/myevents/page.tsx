'use client';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { CalendarIcon, Laptop, BrainCircuit, Globe, Smartphone, Shield } from "lucide-react"
import { ru } from "date-fns/locale"
import { Badge } from "@/components/ui/badge"
import { useRouter } from "next/navigation"
import { RoleGuard } from "@/components/role-guard"
import { keepPreviousData, useQuery } from "@tanstack/react-query"
import { apiEvents } from "@/app/api/http/event/events"

export default function MyEvents() {
    const router = useRouter()

    function parseDate(dateStr: string) {
        const date = new Date(dateStr); // автоматически парсит ISO строку
        const year = date.getUTCFullYear();
        const month = date.getUTCMonth() + 1; // месяцы от 0 до 11
        const day = date.getUTCDate();
        const hours = date.getUTCHours();
        const minutes = date.getUTCMinutes();
        const seconds = date.getUTCSeconds();
        
        return `${year}-${month}-${day}`
    }

    const initialFilters = {
        page: 1,
        page_size: 10,
        // venue: '',
        date: '',
        category: '',
        // format: '',
        event_status: 'active',
        // name: '',
      }

    const [filters, setFilters] = useState({
        page: 1,
        page_size: 10,
        // venue: '',
        date: '',
        category: '',
        // format: '',
        event_status: '',
        // name: '',
    })


    const normalizedFilters = {
        ...filters,
        // venue: filters.venue || undefined,
        date: filters.date || undefined,
        category: filters.category || undefined,
        // format: filters.format || undefined,
        event_status: filters.event_status || undefined,
        // name: filters.name || undefined,
    }

    const { data, isPending, error } = useQuery({
        queryKey: ["my_events", normalizedFilters],
        queryFn: () => apiEvents.getParticipationsEvents(normalizedFilters),
        placeholderData: keepPreviousData
    })

    const events = data?.events ?? []
    const [tempFilters, setTempFilters] = useState(filters)

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
                                {/* Category */}
                                <div className="space-y-2">
                                <Select
                                    value={tempFilters.category}
                                    onValueChange={(value) => setTempFilters((prev) => ({  ...prev, category: value, page: 1, }))}
                                >
                                    <SelectTrigger id="category-select">
                                        <SelectValue placeholder="Все категории" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="1">Искусство</SelectItem>
                                        <SelectItem value="2">Технологии</SelectItem>
                                        <SelectItem value="3">Образование</SelectItem>
                                        <SelectItem value="4">Киберспорт</SelectItem>
                                    </SelectContent>
                                </Select>
                                </div>
                                {/* Event Status */}        
                                <div className="space-y-2">
                                    <Select
                                    value={tempFilters.event_status}
                                    onValueChange={(value) => setTempFilters((prev) => ({ ...prev, event_status: value, page: 1 }))}
                                    >
                                    <SelectTrigger id="event_status">
                                        <SelectValue placeholder="Выберите статус" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="active">Активные</SelectItem>
                                        <SelectItem value="waiting">Предстоящие</SelectItem>
                                        <SelectItem value="closed">Завершённые</SelectItem>
                                    </SelectContent>
                                    </Select>
                                </div>

                                {/* Date */}
                                <div className="space-y-2">
                                    <div className="relative">
                                        <Input
                                        id="date"
                                        type="text"
                                        placeholder="ДД.ММ.ГГГГ"
                                        value={tempFilters.date}
                                        onChange={(e) => setTempFilters((prev) => ({ ...prev, date: e.target.value, page: 1 }))}
                                        />
                                        <CalendarIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                <Button
                                    onClick={() => setFilters({ ...tempFilters, page: 1 })}
                                    className="flex-1"
                                >
                                    Применить
                                </Button>
                                <Button
                                    variant="outline"
                                    onClick={() => {
                                    setFilters(initialFilters)
                                    setTempFilters(initialFilters)
                                    }}
                                    className="flex-1"
                                >
                                    Очистить
                                </Button>
                            </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                            {events.map((event) => (
                                <Card key={event.id} className="bg-background border border-border rounded-xl shadow-lg flex flex-col min-h-[260px] h-full p-5">
                                    <div className="flex flex-col flex-1">
                                        <div className="flex items-center justify-between mb-2">
                                            <div className="flex items-center gap-4 min-w-[48px]">
                                                <span className="flex items-center justify-center w-10 h-10">
                                                    {getEventTypeIcon(event.category.name)}
                                                </span>
                                                <CardTitle className="text-base md:text-lg font-bold break-words line-clamp-2 mr-2 text-white max-w-[180px]">{event.event_name}</CardTitle>
                                            </div>
                                            {getStatusBadge(event.event_status)}
                                        </div>
                                        <div className="text-xs text-muted-foreground mb-2">С {parseDate(event.start_date)} по {parseDate(event.end_date)}</div>
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