"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { CalendarIcon, MapPinIcon, ClockIcon, UsersIcon, X, Laptop, Puzzle, Gamepad2 } from "lucide-react"
import { parse, isValid } from "date-fns"
import { ru } from "date-fns/locale"
import { Hackathon, hackathons } from "../data"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog"
import { HackathonDetails } from "@/app/(protected)/eventdetails/components/HackathonDetails"
import { events as eventDetails } from "@/app/(protected)/eventdetails/data"

export default function HackathonBoard() {
    const [selectedCity, setSelectedCity] = useState("all")
    const [selectedStatus, setSelectedStatus] = useState("all")
    const [selectedEventType, setSelectedEventType] = useState("all")
    const [onlineChecked, setOnlineChecked] = useState(false)
    const [offlineChecked, setOfflineChecked] = useState(false)
    const [hybridChecked, setHybridChecked] = useState(false)
    const [date, setDate] = useState("")
    const [showFilters, setShowFilters] = useState(false)
    const [searchTitle, setSearchTitle] = useState("")
    const [selectedHackathon, setSelectedHackathon] = useState<Hackathon | null>(null)
    const [detailsOpen, setDetailsOpen] = useState(false)

    // Функция для преобразования строки даты в объект Date
    const parseEventDate = (dateStr: string) => {
        return parse(dateStr, "d MMMM yyyy 'в' HH:mm", new Date(), { locale: ru });
    }

    // Функция для преобразования введенной пользователем даты
    const parseUserDate = (dateStr: string) => {
        const parsedDate = parse(dateStr, "dd.MM.yyyy", new Date(), { locale: ru });
        return isValid(parsedDate) ? parsedDate : null;
    }

    // Функция фильтрации хакатонов
    const filteredHackathons = hackathons.filter(hackathon => {
        // Поиск по названию
        if (searchTitle && !hackathon.title.toLowerCase().includes(searchTitle.toLowerCase())) {
            return false;
        }
        // Фильтр по городу
        if (selectedCity !== "all") {
            switch (selectedCity) {
                case "moscow":
                    if (hackathon.location !== "Москва") return false;
                    break;
                case "spb":
                    if (hackathon.location !== "Санкт-Петербург") return false;
                    break;
                case "ekb":
                    if (hackathon.location !== "Екатеринбург") return false;
                    break;
            }
        }

        // Фильтр по статусу
        if (selectedStatus !== "all") {
            if (hackathon.status !== selectedStatus) return false;
        }

        // Фильтр по типу мероприятия
        if (selectedEventType !== "all") {
            if (hackathon.type !== selectedEventType) return false;
        }

        // Фильтр по формату
        const isAnyFormatSelected = onlineChecked || offlineChecked || hybridChecked;
        if (isAnyFormatSelected) {
            if (
                (hackathon.format === "online" && !onlineChecked) ||
                (hackathon.format === "offline" && !offlineChecked) ||
                (hackathon.format === "hybrid" && !hybridChecked)
            ) {
                return false;
            }
        }

        // Фильтр по дате
        if (date) {
            const userDate = parseUserDate(date);
            if (userDate) {
                const eventDate = parseEventDate(hackathon.date);
                if (
                    eventDate.getDate() !== userDate.getDate() ||
                    eventDate.getMonth() !== userDate.getMonth() ||
                    eventDate.getFullYear() !== userDate.getFullYear()
                ) {
                    return false;
                }
            }
        }

        return true;
    }).sort((a, b) => {
        // Сортировка по дате
        const dateA = parseEventDate(a.date);
        const dateB = parseEventDate(b.date);
        return dateA.getTime() - dateB.getTime();
    });

    // Обработчик изменения даты с валидацией и автоматической расстановкой точек
    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.replace(/\./g, ''); // Удаляем все точки

        // Проверяем, что введены только цифры
        if (!/^\d*$/.test(value)) {
            return;
        }

        let formattedValue = '';

        // Добавляем точки после дня и месяца
        if (value.length > 0) {
            // День
            formattedValue += value.slice(0, 2);
            if (value.length > 2) {
                formattedValue += '.';
                // Месяц
                formattedValue += value.slice(2, 4);
                if (value.length > 4) {
                    formattedValue += '.';
                    // Год
                    formattedValue += value.slice(4, 8);
                }
            }
        }

        // Проверяем корректность введенной даты
        if (formattedValue.length === 10) {
            const [day, month, year] = formattedValue.split('.');
            if (
                parseInt(day) > 31 ||
                parseInt(month) > 12 ||
                parseInt(year) < 2024 ||
                parseInt(year) > 2100
            ) {
                return;
            }
        }

        setDate(formattedValue);
    };

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

    // Функция для иконки по типу мероприятия
    function getEventTypeIcon(type: string) {
        switch (type) {
            case "hackathon":
                return <Laptop className="w-16 h-16 text-primary" />
            case "contest":
                return <Puzzle className="w-16 h-16 text-primary" />
            case "cybersport":
                return <Gamepad2 className="w-16 h-16 text-primary" />
            default:
                return <Laptop className="w-16 h-16 text-primary" />
        }
    }

    // Обновленный компонент для публичных деталей мероприятия
    function EventPublicDetails({ event }: { event: Hackathon & { organizer?: string; contacts?: string; capacity?: number } }) {
        // Вычисляем количество свободных мест, если есть capacity
        const freePlaces = typeof event.capacity === 'number' ? event.capacity - event.participants : null;
        return (
            <div className="flex flex-col gap-2 sm:gap-4">
                <div className="w-full h-40 sm:h-48 rounded-lg overflow-hidden relative mb-2">
                    <img src={event.image} alt={event.title} className="object-cover w-full h-full" />
                </div>
                <h2 className="text-xl sm:text-2xl font-bold mb-1 text-center">{event.title}</h2>
                <div className="flex flex-wrap justify-center gap-2 mb-2">
                    {getStatusBadge(event.status)}
                    {getFormatBadge(event.format)}
                </div>
                <div className="flex flex-col sm:flex-row flex-wrap justify-center items-center gap-2 sm:gap-4 text-sm text-muted-foreground mb-2">
                    <div className="flex items-center gap-1"><MapPinIcon className="w-4 h-4" />{event.location}</div>
                    <div className="flex items-center gap-1"><CalendarIcon className="w-4 h-4" />{event.date}</div>
                </div>
                <div className="text-sm sm:text-base text-center text-muted-foreground mb-2 whitespace-pre-line">{event.description}</div>
                {event.prizePool && (
                    <div className="inline-block bg-yellow-100 text-yellow-900 rounded-lg px-3 py-1 text-sm font-bold text-center mx-auto mt-2 mb-0 shadow-sm border border-yellow-200">
                        🏆 Призовой фонд: {event.prizePool}
                    </div>
                )}
                <div className="flex flex-col sm:flex-row flex-wrap justify-center items-center gap-2 sm:gap-4 text-sm mt-2">
                    <div className="flex items-center gap-1"><UsersIcon className="w-4 h-4" />Участников: <span className="font-medium">{event.participants}</span></div>
                    {typeof freePlaces === 'number' && freePlaces >= 0 && (
                        <div className="flex items-center gap-1"><UsersIcon className="w-4 h-4" />Свободных мест: <span className="font-medium">{freePlaces}</span></div>
                    )}
                    {event.organizer && (
                        <div className="flex items-center gap-1"><Laptop className="w-4 h-4" /><span>Организатор:</span> <span className="font-medium">{event.organizer}</span></div>
                    )}
                    {event.contacts && (
                        <div className="flex items-center gap-1"><span className="font-medium">📞 Контакты:</span> <span>{event.contacts}</span></div>
                    )}
                </div>
            </div>
        )
    }

    return (
        <div className="flex flex-col md:flex-row">
            {/* Поиск и фильтры в одну строку на мобильных */}
            <div className="md:hidden flex items-center justify-between gap-2 mt-4 mb-4 px-2 sm:px-4 md:px-6">
                <Input
                    type="text"
                    placeholder="Поиск по названию мероприятия..."
                    value={searchTitle}
                    onChange={e => setSearchTitle(e.target.value)}
                    className="w-full min-w-[120px]"
                />
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
                        {/* City filter */}
                        <div className="space-y-2">
                            <Label htmlFor="city-select">Город</Label>
                            <Select value={selectedCity} onValueChange={setSelectedCity}>
                                <SelectTrigger id="city-select">
                                    <SelectValue placeholder="Все города" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">Все города</SelectItem>
                                    <SelectItem value="moscow">Москва</SelectItem>
                                    <SelectItem value="spb">Санкт-Петербург</SelectItem>
                                    <SelectItem value="ekb">Екатеринбург</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <Separator />
                        {/* Date filter */}
                        <div className="space-y-2">
                            <Label htmlFor="date-input">Дата</Label>
                            <div className="relative">
                                <Input
                                    id="date-input"
                                    type="text"
                                    placeholder="ДД.ММ.ГГГГ"
                                    value={date}
                                    onChange={handleDateChange}
                                    className="pr-10"
                                />
                                <CalendarIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            </div>
                        </div>
                        <Separator />
                        {/* Status filter */}
                        <div className="space-y-2">
                            <Label htmlFor="status-select">Статус</Label>
                            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                                <SelectTrigger id="status-select">
                                    <SelectValue placeholder="Все статусы" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">Все статусы</SelectItem>
                                    <SelectItem value="active">Активные</SelectItem>
                                    <SelectItem value="completed">Завершенные</SelectItem>
                                    <SelectItem value="upcoming">Предстоящие</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <Separator />
                        {/* Event type filter */}
                        <div className="space-y-2">
                            <Label htmlFor="event-type-select">Тип мероприятия</Label>
                            <Select value={selectedEventType} onValueChange={setSelectedEventType}>
                                <SelectTrigger id="event-type-select">
                                    <SelectValue placeholder="Все мероприятия" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">Все мероприятия</SelectItem>
                                    <SelectItem value="hackathon">Хакатоны</SelectItem>
                                    <SelectItem value="contest">Алгоритмы</SelectItem>
                                    <SelectItem value="cybersport">Киберспорт</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <Separator />
                        {/* Format filter */}
                        <div className="space-y-3">
                            <Label>Формат</Label>
                            <div className="space-y-3">
                                <div className="flex items-center space-x-2">
                                    <Checkbox
                                        id="online"
                                        checked={onlineChecked}
                                        onCheckedChange={(checked) => setOnlineChecked(checked === true)}
                                    />
                                    <Label htmlFor="online" className="text-sm font-normal">
                                        Онлайн
                                    </Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Checkbox
                                        id="offline"
                                        checked={offlineChecked}
                                        onCheckedChange={(checked) => setOfflineChecked(checked === true)}
                                    />
                                    <Label htmlFor="offline" className="text-sm font-normal">
                                        Офлайн
                                    </Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Checkbox
                                        id="hybrid"
                                        checked={hybridChecked}
                                        onCheckedChange={(checked) => setHybridChecked(checked === true)}
                                    />
                                    <Label htmlFor="hybrid" className="text-sm font-normal">
                                        Гибрид
                                    </Label>
                                </div>
                            </div>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>

            {/* Sidebar with filters */}
            <Card className="hidden md:block w-full md:w-80 h-auto md:h-[calc(100vh-4rem)] md:sticky md:top-16 rounded-none md:border-r border-border bg-card overflow-y-auto mb-4 md:mb-0">
                <CardHeader>
                    <CardTitle className="text-xl mb-4">Фильтры</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    {/* City filter */}
                    <div className="space-y-2">
                        <Label htmlFor="city-select">Город</Label>
                        <Select value={selectedCity} onValueChange={setSelectedCity}>
                            <SelectTrigger id="city-select">
                                <SelectValue placeholder="Все города" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">Все города</SelectItem>
                                <SelectItem value="moscow">Москва</SelectItem>
                                <SelectItem value="spb">Санкт-Петербург</SelectItem>
                                <SelectItem value="ekb">Екатеринбург</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <Separator />

                    {/* Date filter */}
                    <div className="space-y-2">
                        <Label htmlFor="date-input">Дата</Label>
                        <div className="relative">
                            <Input
                                id="date-input"
                                type="text"
                                placeholder="ДД.ММ.ГГГГ"
                                value={date}
                                onChange={handleDateChange}
                                className="pr-10"
                            />
                            <CalendarIcon className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        </div>
                    </div>

                    <Separator />

                    {/* Status filter */}
                    <div className="space-y-2">
                        <Label htmlFor="status-select">Статус</Label>
                        <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                            <SelectTrigger id="status-select">
                                <SelectValue placeholder="Все статусы" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">Все статусы</SelectItem>
                                <SelectItem value="active">Активные</SelectItem>
                                <SelectItem value="completed">Завершенные</SelectItem>
                                <SelectItem value="upcoming">Предстоящие</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <Separator />

                    {/* Event type filter */}
                    <div className="space-y-2">
                        <Label htmlFor="event-type-select">Тип мероприятия</Label>
                        <Select value={selectedEventType} onValueChange={setSelectedEventType}>
                            <SelectTrigger id="event-type-select">
                                <SelectValue placeholder="Все мероприятия" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">Все мероприятия</SelectItem>
                                <SelectItem value="hackathon">Хакатоны</SelectItem>
                                <SelectItem value="contest">Алгоритмы</SelectItem>
                                <SelectItem value="cybersport">Киберспорт</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <Separator />

                    {/* Format filter */}
                    <div className="space-y-3">
                        <Label>Формат</Label>
                        <div className="space-y-3">
                            <div className="flex items-center space-x-2">
                                <Checkbox
                                    id="online"
                                    checked={onlineChecked}
                                    onCheckedChange={(checked) => setOnlineChecked(checked === true)}
                                />
                                <Label htmlFor="online" className="text-sm font-normal">
                                    Онлайн
                                </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Checkbox
                                    id="offline"
                                    checked={offlineChecked}
                                    onCheckedChange={(checked) => setOfflineChecked(checked === true)}
                                />
                                <Label htmlFor="offline" className="text-sm font-normal">
                                    Офлайн
                                </Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Checkbox
                                    id="hybrid"
                                    checked={hybridChecked}
                                    onCheckedChange={(checked) => setHybridChecked(checked === true)}
                                />
                                <Label htmlFor="hybrid" className="text-sm font-normal">
                                    Гибрид
                                </Label>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Main content */}
            <div className="flex-1 p-2 sm:p-4 md:p-6">
                <div className="w-full md:w-[1100px] mx-auto">
                    {/* Только на десктопе — поиск над карточками */}
                    <div className="hidden md:block mb-4">
                        <Input
                            type="text"
                            placeholder="Поиск по названию мероприятия..."
                            value={searchTitle}
                            onChange={e => setSearchTitle(e.target.value)}
                            className="w-[25%] min-w-[220px]"
                        />
                    </div>
                    <div className="space-y-4 md:space-y-6">
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                            {filteredHackathons.map((hackathon) => (
                                <Card key={hackathon.id} className="flex flex-col justify-between items-stretch p-4 min-h-[280px] sm:aspect-square sm:min-h-[260px] sm:max-h-[340px]">
                                    <div className="flex flex-col gap-2 flex-1 items-center justify-center">
                                        <div className="flex items-center gap-1 mb-2">
                                            {getStatusBadge(hackathon.status)}
                                            {getFormatBadge(hackathon.format)}
                                        </div>
                                        <div className="mb-2">{getEventTypeIcon(hackathon.type)}</div>
                                        <h3 className="text-lg font-semibold line-clamp-1 text-center">{hackathon.title}</h3>
                                        <div className="flex items-center gap-2 text-xs text-muted-foreground justify-center">
                                            <MapPinIcon className="w-4 h-4" />
                                            <span>{hackathon.location}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-xs text-muted-foreground justify-center">
                                            <CalendarIcon className="w-4 h-4" />
                                            <span>{hackathon.date}</span>
                                        </div>
                                        {/* <p className="text-xs text-muted-foreground text-center mb-2">{hackathon.description}</p> */}
                                        {hackathon.prizePool && (
                                            <div className="inline-block bg-yellow-100 text-yellow-900 rounded-lg px-3 py-1 text-sm font-bold text-center mx-auto mt-2 mb-0 shadow-sm border border-yellow-200">
                                                🏆 Призовой фонд: {hackathon.prizePool}
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex justify-center w-full mt-2">
                                        <Button
                                            className="bg-green-600 hover:bg-green-700 text-white w-auto mx-auto px-6 sm:px-8 text-sm sm:text-base"
                                            onClick={() => {
                                                setSelectedHackathon(hackathon)
                                                setDetailsOpen(true)
                                            }}
                                        >
                                            Подробнее
                                        </Button>
                                    </div>
                                </Card>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            {/* Модальное окно с подробностями */}
            <Dialog open={detailsOpen} onOpenChange={setDetailsOpen}>
                <DialogContent className="max-w-2xl w-full">
                    <DialogHeader>
                        <DialogTitle>Подробная информация</DialogTitle>
                    </DialogHeader>
                    {selectedHackathon ? (
                        <EventPublicDetails event={selectedHackathon} />
                    ) : null}
                    <div className="flex justify-end mt-4">
                        <Button className="bg-blue-600 hover:bg-blue-700 text-white">Подать заявку</Button>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    )
} 