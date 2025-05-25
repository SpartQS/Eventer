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
import { CalendarIcon, MapPinIcon, ClockIcon, UsersIcon } from "lucide-react"

interface Hackathon {
    id: number
    title: string
    date: string
    description: string
    prizePool: string
    location: string
    participants: number
    status: "active" | "upcoming" | "completed"
    format: "online" | "offline" | "hybrid"
    image: string
}

export default function HackathonBoard() {
    const [selectedCity, setSelectedCity] = useState("all")
    const [selectedStatus, setSelectedStatus] = useState("all")
    const [selectedEventType, setSelectedEventType] = useState("all")
    const [onlineChecked, setOnlineChecked] = useState(false)
    const [offlineChecked, setOfflineChecked] = useState(false)
    const [date, setDate] = useState("")

    const hackathons: Hackathon[] = [
        {
            id: 1,
            title: "Хакатон",
            date: "Sunday, December 03, 2023 at 8:00 AM",
            description:
                "Хакатон — это особый формат соревнования, где участники решают поставленную перед ними задачу за ограниченный срок. Качество и скорость выполнения задания — это два обязательных составляющих конкурса IT-специалистов. Остальные параметры могут варьироваться в зависимости от формата мероприятия.",
            prizePool: "100 000",
            location: "Москва",
            participants: 150,
            status: "active",
            format: "hybrid",
            image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
        },
        {
            id: 2,
            title: "Хакатон",
            date: "Sunday, December 03, 2023 at 8:00 AM",
            description:
                "Хакатон — это особый формат соревнования, где участники решают поставленную перед ними задачу за ограниченный срок. Качество и скорость выполнения задания — это два обязательных составляющих конкурса IT-специалистов. Остальные параметры могут варьироваться в зависимости от формата мероприятия.",
            prizePool: "100 000",
            location: "Санкт-Петербург",
            participants: 120,
            status: "upcoming",
            format: "offline",
            image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
        },
        {
            id: 3,
            title: "Хакатон",
            date: "Sunday, December 03, 2023 at 8:00 AM",
            description:
                "Хакатон — это особый формат соревнования, где участники решают поставленную перед ними задачу за ограниченный срок. Качество и скорость выполнения задания — это два обязательных составляющих конкурса IT-специалистов. Остальные параметры могут варьироваться в зависимости от формата мероприятия.",
            prizePool: "100 000",
            location: "Онлайн",
            participants: 200,
            status: "active",
            format: "online",
            image: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
        },
    ]

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

    return (
        <div className="flex">
            {/* Sidebar with filters */}
            <Card className="w-80 rounded-none border-r border-border bg-card">
                <CardHeader>
                    <CardTitle className="text-xl">Фильтры</CardTitle>
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
                                <SelectItem value="online">Онлайн</SelectItem>
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
                                onChange={(e) => setDate(e.target.value)}
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
                                <SelectItem value="hackathon">Хакатон</SelectItem>
                                <SelectItem value="contest">Конкурс</SelectItem>
                                <SelectItem value="workshop">Воркшоп</SelectItem>
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
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Main content */}
            <div className="flex-1 p-6">
                <div className="space-y-6">
                    {hackathons.map((hackathon) => (
                        <Card key={hackathon.id} className="overflow-hidden">
                            <div className="flex h-[300px]">
                                {/* Event poster */}
                                <div className="w-80 flex-shrink-0 relative">
                                    <img
                                        src={hackathon.image}
                                        alt={hackathon.title}
                                        className="absolute inset-0 w-full h-full object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/20"></div>
                                    <div className="absolute inset-0 p-6 flex flex-col justify-between text-white">
                                        <div>
                                            <div className="text-3xl font-bold mb-2 tracking-wider">ХАКА ТОН</div>
                                            <div className="text-sm opacity-90">по программированию</div>
                                        </div>
                                        <div className="text-center">
                                            <div className="text-xs mb-1 opacity-80">призовой фонд</div>
                                            <div className="text-4xl font-bold mb-1">{hackathon.prizePool}</div>
                                            <div className="text-xs opacity-80">от партнеров</div>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <div className="text-xs opacity-80">оргкомитет</div>
                                            <div className="flex space-x-1">
                                                <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
                                                    <div className="w-3 h-3 bg-white/60 rounded-full"></div>
                                                </div>
                                                <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
                                                    <div className="w-3 h-3 bg-white/60 rounded-full"></div>
                                                </div>
                                                <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
                                                    <div className="w-3 h-3 bg-white/60 rounded-full"></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Event details */}
                                <CardContent className="flex-1 p-6">
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-3 mb-3">
                                                <h3 className="text-2xl font-semibold">{hackathon.title}</h3>
                                                {getStatusBadge(hackathon.status)}
                                                {getFormatBadge(hackathon.format)}
                                            </div>

                                            <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                                                <div className="flex items-center gap-1">
                                                    <ClockIcon className="h-4 w-4" />
                                                    {hackathon.date}
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <MapPinIcon className="h-4 w-4" />
                                                    {hackathon.location}
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <UsersIcon className="h-4 w-4" />
                                                    {hackathon.participants} участников
                                                </div>
                                            </div>
                                        </div>
                                        <Button className="bg-green-600 hover:bg-green-700 text-white">Присоединиться</Button>
                                    </div>

                                    <div className="mb-6">
                                        <h4 className="text-sm font-medium mb-3 text-muted-foreground">Описание</h4>
                                        <p className="text-sm leading-relaxed">{hackathon.description}</p>
                                    </div>

                                    <div className="flex justify-end">
                                        <Button variant="outline">Подать заявку</Button>
                                    </div>
                                </CardContent>
                            </div>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    )
} 