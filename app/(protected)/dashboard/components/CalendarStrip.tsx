'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { hackathons, Hackathon } from '@/components/hackathons-data'
import Image from 'next/image'
import { CardContent, CardTitle } from '@/components/ui/card'
import { UsersIcon, MapPinIcon, CalendarIcon } from 'lucide-react'
import { parse } from 'date-fns'
import { ru } from 'date-fns/locale'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

const WEEKDAYS = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота']
const MONTHS = [
    'Января', 'Февраля', 'Марта', 'Апреля', 'Мая', 'Июня',
    'Июля', 'Августа', 'Сентября', 'Октября', 'Ноября', 'Декабря'
]

function getDaysInMonth(year: number, month: number) {
    return new Date(year, month + 1, 0).getDate()
}

function getStatusBadge(status: string) {
    if (status === 'active') return <Badge className="bg-green-600 text-white">Активный</Badge>
    if (status === 'upcoming') return <Badge className="bg-yellow-600 text-white">Скоро</Badge>
    if (status === 'completed') return <Badge className="bg-gray-500 text-white">Завершён</Badge>
    return null
}
function getFormatBadge(format: string) {
    if (format === 'hybrid') return <Badge variant="outline" className="border-orange-400 text-orange-400">Гибрид</Badge>
    if (format === 'online') return <Badge variant="outline" className="border-blue-400 text-blue-400">Онлайн</Badge>
    if (format === 'offline') return <Badge variant="outline" className="border-purple-400 text-purple-400">Оффлайн</Badge>
    return null
}

function EventCard({ event }: { event: Hackathon }) {
    return (
        <Card className="w-full flex flex-row overflow-hidden bg-card border border-border">
            <div className="relative w-[340px] min-h-[320px] flex-shrink-0">
                <Image src={event.image} alt={event.title} fill className="object-cover" />
                <div className="absolute left-0 bottom-0 w-full p-6 bg-gradient-to-t from-black/80 to-transparent flex flex-col gap-2">
                    <span className="text-2xl font-bold text-white">{event.title}</span>
                    <span className="text-base text-white/80">по программированию</span>
                    <div className="mt-4">
                        <span className="text-3xl font-extrabold text-white">{event.prizePool}</span>
                        <span className="ml-2 text-white/70 text-sm">призовой фонд</span>
                    </div>
                    <span className="text-xs text-white/60 mt-2">от партнеров</span>
                    <span className="text-xs text-white/60 mt-2">оргкомитет</span>
                </div>
            </div>
            <div className="flex flex-col flex-1 p-6 gap-2">
                <div className="flex items-center gap-2 mb-2">
                    <span className="text-2xl font-bold">{event.title}</span>
                    {getStatusBadge(event.status)}
                    {getFormatBadge(event.format)}
                </div>
                <div className="flex items-center gap-4 text-muted-foreground text-base mb-2">
                    <CalendarIcon className="w-5 h-5" /> {event.date}
                    <MapPinIcon className="w-5 h-5" /> {event.location}
                    <UsersIcon className="w-5 h-5" /> {event.participants} участников
                </div>
                <div className="font-semibold text-base mt-2">Описание</div>
                <div className="text-base mb-4">{event.description}</div>
                <div className="flex gap-4 mt-auto">
                    <Button className="bg-green-600 hover:bg-green-700 text-white">Подробнее</Button>
                </div>
            </div>
        </Card>
    )
}

export default function CalendarStrip() {
    const today = new Date()
    const [selectedDate, setSelectedDate] = useState(new Date(today.getFullYear(), today.getMonth(), today.getDate()))

    const year = selectedDate.getFullYear()
    // const month = selectedDate.getMonth()
    // const daysInMonth = getDaysInMonth(year, month)

    // Состояние для месяца и года
    const [selectedMonth, setSelectedMonth] = useState(selectedDate.getMonth())
    const [selectedYear, setSelectedYear] = useState(selectedDate.getFullYear())
    // Диапазон годов
    const YEARS = Array.from({ length: 11 }, (_, i) => 2020 + i)
    // При смене месяца сбрасываем выбранный день на 1
    const handleMonthChange = (value: string) => {
        const newMonth = parseInt(value)
        setSelectedMonth(newMonth)
        setSelectedDate(new Date(selectedYear, newMonth, 1))
    }
    // При смене года сбрасываем выбранный день на 1 января выбранного года и месяца
    const handleYearChange = (value: string) => {
        const newYear = parseInt(value)
        setSelectedYear(newYear)
        setSelectedDate(new Date(newYear, selectedMonth, 1))
    }
    // daysInMonth теперь зависит от selectedMonth и selectedYear
    const daysInMonth = getDaysInMonth(selectedYear, selectedMonth)

    const handleDayChange = (day: number) => {
        setSelectedDate(new Date(year, selectedMonth, day))
    }

    const handlePrevDay = () => {
        if (selectedDate.getDate() > 1) {
            setSelectedDate(new Date(year, selectedMonth, selectedDate.getDate() - 1))
        }
    }
    const handleNextDay = () => {
        if (selectedDate.getDate() < daysInMonth) {
            setSelectedDate(new Date(year, selectedMonth, selectedDate.getDate() + 1))
        }
    }
    const handlePrevMonth = () => {
        const newMonth = selectedMonth === 0 ? 11 : selectedMonth - 1
        const newYear = selectedMonth === 0 ? year - 1 : year
        setSelectedDate(new Date(newYear, newMonth, 1))
    }
    const handleNextMonth = () => {
        const newMonth = selectedMonth === 11 ? 0 : selectedMonth + 1
        const newYear = selectedMonth === 11 ? year + 1 : year
        setSelectedDate(new Date(newYear, newMonth, 1))
    }

    // Функция для парсинга даты мероприятия
    function parseEventDate(dateStr: string) {
        return parse(dateStr, "d MMMM yyyy 'в' HH:mm", new Date(), { locale: ru })
    }

    const eventsForSelectedDay = hackathons.filter(event => {
        const eventDate = parseEventDate(event.date)
        return (
            eventDate.getDate() === selectedDate.getDate() &&
            eventDate.getMonth() === selectedDate.getMonth() &&
            eventDate.getFullYear() === selectedDate.getFullYear()
        )
    })

    // Получаем список дней с мероприятиями в текущем месяце
    const eventDays = hackathons
        .map(event => {
            const eventDate = parseEventDate(event.date)
            if (
                eventDate.getMonth() === selectedMonth &&
                eventDate.getFullYear() === selectedYear
            ) {
                return eventDate.getDate()
            }
            return null
        })
        .filter(Boolean)

    return (
        <div className="w-full flex flex-col items-center">
            <div className="flex items-center gap-4 mb-4">
                <Badge variant="secondary" className="text-base font-medium px-4 py-2 h-9 flex items-center min-w-[80px] justify-center">
                    {WEEKDAYS[selectedDate.getDay()]}, {selectedDate.getDate()}
                </Badge>
                <Select value={selectedMonth.toString()} onValueChange={handleMonthChange}>
                    <SelectTrigger className="w-[140px] h-10">
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        {MONTHS.map((m, idx) => (
                            <SelectItem key={m} value={idx.toString()}>{m}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                <Select value={selectedYear.toString()} onValueChange={handleYearChange}>
                    <SelectTrigger className="w-[100px] h-10">
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="max-h-60 overflow-y-auto">
                        {YEARS.map((y) => (
                            <SelectItem key={y} value={y.toString()}>{y}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
            <Card className="w-full flex flex-col items-center p-4 mb-4">
                <div className="flex items-center w-full justify-center">
                    <Button
                        variant="secondary"
                        size="icon"
                        className="mr-2"
                        onClick={handlePrevDay}
                        disabled={selectedDate.getDate() === 1}
                    >
                        &#8592;
                    </Button>
                    <div className="flex gap-2 overflow-x-auto px-2 py-2 rounded-xl">
                        {Array.from({ length: daysInMonth }, (_, i) => i + 1).map((day) => {
                            const hasEvent = eventDays.includes(day)
                            return (
                                <div key={day} className="relative">
                                    <Button
                                        variant={selectedDate.getDate() === day ? 'default' : 'secondary'}
                                        size="icon"
                                        className={`w-8 h-8 rounded-md border ${selectedDate.getDate() === day ? 'font-bold' : ''}`}
                                        onClick={() => setSelectedDate(new Date(selectedYear, selectedMonth, day))}
                                    >
                                        {day}
                                    </Button>
                                    {hasEvent && (
                                        <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-green-500 border-2 border-background"></span>
                                    )}
                                </div>
                            )
                        })}
                    </div>
                    <Button
                        variant="secondary"
                        size="icon"
                        className="ml-2"
                        onClick={handleNextDay}
                        disabled={selectedDate.getDate() === daysInMonth}
                    >
                        &#8594;
                    </Button>
                </div>
            </Card>
            <div className="w-full mt-0 flex flex-col gap-4">
                {eventsForSelectedDay.length === 0 ? (
                    <span className="text-muted-foreground text-center">Нет мероприятий на этот день</span>
                ) : (
                    eventsForSelectedDay.map(event => (
                        <EventCard key={event.id} event={event} />
                    ))
                )}
            </div>
        </div>
    )
} 