'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import { ru } from "date-fns/locale"
import { cn } from "@/lib/utils"

interface BasicSettingsProps {
    startDate: Date | undefined
    endDate: Date | undefined
    onStartDateChange: (date: Date | undefined) => void
    onEndDateChange: (date: Date | undefined) => void
}

export function BasicSettings({ startDate, endDate, onStartDateChange, onEndDateChange }: BasicSettingsProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-xl">Базовые настройки</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="job-name" className="text-base">Название мероприятия</Label>
                            <Input
                                id="job-name"
                                placeholder="Введите название мероприятия"
                                className="text-base"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="event-type" className="text-base">Тип мероприятия</Label>
                            <Select defaultValue="hackathon">
                                <SelectTrigger className="text-base">
                                    <SelectValue placeholder="Выберите тип мероприятия" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="hackathon">Хакатон</SelectItem>
                                    <SelectItem value="conference">Конференция</SelectItem>
                                    <SelectItem value="workshop">Воркшоп</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="location" className="text-base">Локация</Label>
                            <Input
                                id="location"
                                placeholder="Введите название локации"
                                className="text-base"
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="start-date" className="text-base">Дата начала</Label>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button
                                            variant="outline"
                                            className={cn(
                                                "w-full justify-start text-left font-normal",
                                                !startDate && "text-muted-foreground"
                                            )}
                                        >
                                            <CalendarIcon className="mr-2 h-4 w-4" />
                                            {startDate ? format(startDate, "PPP", { locale: ru }) : "Выберите дату"}
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0">
                                        <Calendar
                                            mode="single"
                                            selected={startDate}
                                            onSelect={onStartDateChange}
                                            initialFocus
                                        />
                                    </PopoverContent>
                                </Popover>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="end-date" className="text-base">Дата конца</Label>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button
                                            variant="outline"
                                            className={cn(
                                                "w-full justify-start text-left font-normal",
                                                !endDate && "text-muted-foreground"
                                            )}
                                        >
                                            <CalendarIcon className="mr-2 h-4 w-4" />
                                            {endDate ? format(endDate, "PPP", { locale: ru }) : "Выберите дату"}
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0">
                                        <Calendar
                                            mode="single"
                                            selected={endDate}
                                            onSelect={onEndDateChange}
                                            initialFocus
                                        />
                                    </PopoverContent>
                                </Popover>
                            </div>
                        </div>
                    </div>
                    <div className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="job-description" className="text-base">Описание работы</Label>
                            <Textarea
                                id="job-description"
                                placeholder="Введите описание мероприятия"
                                className="text-base min-h-[200px]"
                            />
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
} 