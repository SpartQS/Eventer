"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { CalendarIcon, MapPinIcon, ClockIcon, UsersIcon, X } from "lucide-react"
import { parse, isValid } from "date-fns"
import { ru } from "date-fns/locale"
import { Hackathon, hackathons } from "../data"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog"
import { keepPreviousData, useQuery } from "@tanstack/react-query"
import { apiEvents } from "@/app/api/http/event/events"

export default function HackathonBoard() {
    const [showFilters, setShowFilters] = useState(false)

    const getStatusBadge = (status: string) => {
        switch (status) {
            case "active":
                return <Badge className="bg-green-600 hover:bg-green-700">Активный</Badge>
            case "waiting":
                return <Badge className="bg-blue-600 hover:bg-blue-700">Предстоящий</Badge>
            case "closed":
                return <Badge className="bg-gray-600 hover:bg-gray-700">Завершен</Badge>
            default:
                return <Badge variant="secondary">{status}</Badge>
        }
    }

    const getFormatBadge = (format: string) => {
        switch (format) {
            case "online":
                return (
                    <Badge variant="outline" className="border-blue-500 text-blue-400">
                        Онлайн
                    </Badge>
                )
            case "offline":
                return (
                    <Badge variant="outline" className="border-purple-500 text-purple-400">
                        Офлайн
                    </Badge>
                )
            case "hybrid":
                return (
                    <Badge variant="outline" className="border-orange-500 text-orange-400">
                        Гибрид
                    </Badge>
                )
            default:
                return <Badge variant="outline">{format}</Badge>
        }
    }

    // Функция для получения цвета бейджа формата
    const getFormatBadgeStyle = (format: string) => {
        switch (format) {
            case "online":
                return "border-blue-500 text-blue-500";
            case "offline":
                return "border-purple-500 text-purple-500";
            case "hybrid":
                return "border-orange-500 text-orange-500";
            default:
                return "";
        }
    };

    function parseDate(dateStr: string) {
        const date = new Date(dateStr); // автоматически парсит ISO строку
        const year = date.getUTCFullYear();
        const month = date.getUTCMonth() + 1; // месяцы от 0 до 11
        const day = date.getUTCDate();
        const hours = date.getUTCHours();
        const minutes = date.getUTCMinutes();
        const seconds = date.getUTCSeconds();
        
        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
    }

    const initialFilters = {
        page: 1,
        page_size: 10,
        venue: '',
        date: '',
        category: '',
        format: '',
        event_status: 'active',
        name: '',
      }

    const [filters, setFilters] = useState({
        page: 1,
        page_size: 10,
        venue: '',
        date: '',
        category: '',
        format: '',
        event_status: '',
        name: '',
    })

    const [tempFilters, setTempFilters] = useState(filters)

    const normalizedFilters = {
        ...filters,
        venue: filters.venue || undefined,
        date: filters.date || undefined,
        category: filters.category || undefined,
        format: filters.format || undefined,
        event_status: filters.event_status || undefined,
        name: filters.name || undefined,
    }
    
    const { data, isPending, error } = useQuery({
        queryKey: ['Events', normalizedFilters],
        queryFn: () => apiEvents.getAllEvents(normalizedFilters),
        placeholderData: keepPreviousData
    })

    const events = data?.events ?? []
    

    return (
        <div className="flex flex-col md:flex-row">
            {/* Поиск и фильтры в одну строку на мобильных */}
            <div className="md:hidden flex items-center justify-between gap-2 mt-4 mb-4 px-2 sm:px-4 md:px-6">
                <Button variant="outline" className="ml-2 flex-shrink-0" onClick={() => setShowFilters(true)}>
                    Фильтры
                </Button>
            </div>
            <Dialog open={showFilters} onOpenChange={setShowFilters}>
                <DialogContent showCloseButton={false} className="max-w-xs w-full rounded-2xl p-4 pt-6 max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle className="text-center w-full">Фильтры</DialogTitle>
                        <DialogClose asChild>
                            <Button variant="ghost" size="icon" className="absolute right-2 top-2 rounded-full p-2" onClick={() => setShowFilters(false)} aria-label="Закрыть фильтры">
                                <X className="w-6 h-6" />
                            </Button>
                        </DialogClose>
                    </DialogHeader>
                    <div className="space-y-6">
                    <Separator />
                    {/* Venue */}
                    <div className="space-y-2">
                        <Label htmlFor="venue">Место проведения</Label>
                        <Input
                        id="venue"
                        value={tempFilters.venue}
                        onChange={(e) => setTempFilters((prev) => ({ ...prev, venue: e.target.value, page: 1 }))}
                        placeholder="Введите место"
                        />
                    </div>

                    <Separator />

                     {/* Date */}
                    <div className="space-y-2">
                        <Label htmlFor="date">Дата</Label>
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

                    <Separator />

                    {/* Category */}
                    <div className="space-y-2">
                    <Label htmlFor="category-select">Категория</Label>
                    <Select
                        value={tempFilters.category}
                        onValueChange={(value) => setTempFilters((prev) => ({  ...prev, category: value, page: 1, }))}
                    >
                        <SelectTrigger id="category-select">
                            <SelectValue placeholder="Все категории" />
                        </SelectTrigger>
                        <SelectContent>
                            {/* <SelectItem value="">Все категории</SelectItem> */}
                            <SelectItem value="1">Искусство</SelectItem>
                            <SelectItem value="2">Технологии</SelectItem>
                            <SelectItem value="3">Образование</SelectItem>
                            <SelectItem value="4">Киберспорт</SelectItem>
                        </SelectContent>
                    </Select>
                    </div>

                    <Separator />

                    {/* Format */}
                    <div className="space-y-2">
                        <Label htmlFor="format">Формат</Label>
                        <Select
                        value={tempFilters.format}
                        onValueChange={(value) => setTempFilters((prev) => ({ ...prev, format: value, page: 1 }))}
                        >
                        <SelectTrigger id="format">
                            <SelectValue placeholder="Выберите формат" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="online">Онлайн</SelectItem>
                            <SelectItem value="offline">Оффлайн</SelectItem>
                            <SelectItem value="hybrid">Гибрид</SelectItem>
                        </SelectContent>
                        </Select>
                    </div>

                    <Separator />

                    {/* Event Status */}
                    <div className="space-y-2">
                        <Label htmlFor="event_status">Статус</Label>
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

                    <Separator />

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
                </DialogContent>
            </Dialog>

            {/* Sidebar with filters PC */}
            <Card className="hidden md:block w-full md:w-80 h-auto md:h-[calc(100vh-4rem)] md:sticky md:top-16 rounded-none md:border-r border-border bg-card overflow-y-auto mb-4 md:mb-0">
                <CardHeader>
                    <CardTitle className="text-xl mb-4">Фильтры</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    {/* Name */}
                    <div className="space-y-2">
                    <Label htmlFor="date">Название</Label>
                    <div className="relative">
                            <Input
                            id="date"
                            type="text"
                            placeholder="Название"
                            value={tempFilters.name}
                            onChange={(e) => setTempFilters((prev) => ({ ...prev, name: e.target.value, page: 1 }))}
                            />
                            <CalendarIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        </div>
                    </div>

                    <Separator />
                    {/* Venue */}
                    <div className="space-y-2">
                        <Label htmlFor="venue">Место проведения</Label>
                        <Input
                        id="venue"
                        value={tempFilters.venue}
                        onChange={(e) => setTempFilters((prev) => ({ ...prev, venue: e.target.value, page: 1 }))}
                        placeholder="Введите место"
                        />
                    </div>

                    <Separator />

                     {/* Date */}
                    <div className="space-y-2">
                        <Label htmlFor="date">Дата</Label>
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

                    <Separator />

                    {/* Category */}
                    <div className="space-y-2">
                    <Label htmlFor="category-select">Категория</Label>
                    <Select
                        value={tempFilters.category}
                        onValueChange={(value) => setTempFilters((prev) => ({  ...prev, category: value, page: 1, }))}
                    >
                        <SelectTrigger id="category-select">
                            <SelectValue placeholder="Все категории" />
                        </SelectTrigger>
                        <SelectContent>
                            {/* <SelectItem value="">Все категории</SelectItem> */}
                            <SelectItem value="1">Искусство</SelectItem>
                            <SelectItem value="2">Технологии</SelectItem>
                            <SelectItem value="3">Образование</SelectItem>
                            <SelectItem value="4">Киберспорт</SelectItem>
                        </SelectContent>
                    </Select>
                    </div>

                    <Separator />

                    {/* Format */}
                    <div className="space-y-2">
                        <Label htmlFor="format">Формат</Label>
                        <Select
                        value={tempFilters.format}
                        onValueChange={(value) => setTempFilters((prev) => ({ ...prev, format: value, page: 1 }))}
                        >
                        <SelectTrigger id="format">
                            <SelectValue placeholder="Выберите формат" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="online">Онлайн</SelectItem>
                            <SelectItem value="offline">Оффлайн</SelectItem>
                            <SelectItem value="hybrid">Гибрид</SelectItem>
                        </SelectContent>
                        </Select>
                    </div>

                    <Separator />

                    {/* Event Status */}
                    <div className="space-y-2">
                        <Label htmlFor="event_status">Статус</Label>
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

                    <Separator />

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
                </CardContent>
            </Card>

            {/* Main content */}
            <div className="flex-1 p-2 sm:p-4 md:p-6">
                <div className="w-full md:w-[1100px] mx-auto">
                    <div className="space-y-4 md:space-y-6">
                        {events?.map((event) => (
                        // {filteredHackathons.map((hackathon) => (
                            <Card key={event.id} className="overflow-hidden w-full">
                                <div className="flex flex-col md:flex-row h-auto md:h-[300px]">
                                    {/* Event poster */}
                                    <div className="w-full md:w-80 h-48 md:h-auto flex-shrink-0 relative">
                                        <img
                                            src={"https://images.unsplash.com/photo-1504384308090-c894fdcc538d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"}
                                            alt={"https://images.unsplash.com/photo-1504384308090-c894fdcc538d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"}
                                            className="absolute inset-0 w-full h-full object-cover"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/20"></div>
                                        <div className="absolute inset-0 p-4 md:p-6 flex flex-col justify-between text-white">
                                            <div>
                                                <div className="text-xl md:text-3xl font-bold mb-2 tracking-wider">{event.event_name}</div>
                                            </div>
                                        </div>
                                    </div>
                                    {/* Event details */}
                                    <CardContent className="flex-1 p-4 md:p-6">
                                        <div className="flex flex-col md:flex-row justify-between items-start mb-4 gap-2 md:gap-0">
                                            <div className="flex-1">
                                                <div className="flex items-center gap-2 md:gap-3 mb-2 md:mb-3">
                                                    <h3 className="text-lg md:text-2xl font-semibold">{event.event_name}</h3>
                                                    {getStatusBadge(event.event_status)}
                                                    {getFormatBadge(event.format)}
                                                </div>

                                                <div className="flex flex-wrap items-center gap-2 md:gap-4 text-xs md:text-sm text-muted-foreground mb-2 md:mb-4">
                                                    <div className="flex items-center gap-1">
                                                        <ClockIcon className="h-4 w-4" />
                                                        {parseDate(event.start_date)}
                                                    </div>
                                                    <div className="flex items-center gap-1">
                                                        <MapPinIcon className="h-4 w-4" />
                                                        {event.venue}
                                                    </div>
                                                    <div className="flex items-center gap-1">
                                                        <UsersIcon className="h-4 w-4" />
                                                        {event.users_count} участников
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="mb-4 md:mb-6">
                                            <h4 className="text-xs md:text-sm font-medium mb-2 md:mb-3 text-muted-foreground">Описание</h4>
                                            <p className="text-xs md:text-sm leading-relaxed">{event.description}</p>
                                        </div>

                                        <div className="flex justify-between items-center mt-4">
                                            <span className="text-sm text-gray-400">
                                                <UsersIcon className="inline-block w-4 h-4 mr-1" />
                                                {event.users_count} участников
                                            </span>
                                            <Button asChild>
                                                <Link href={`/eventdetails/${event.id}`}>
                                                    Подробнее
                                                </Link>
                                            </Button>
                                        </div>
                                    </CardContent>
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
} 