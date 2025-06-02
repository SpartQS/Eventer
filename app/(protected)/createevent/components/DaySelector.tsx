'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { format, eachDayOfInterval, isSameDay } from "date-fns"
import { ru } from "date-fns/locale"
import { cn } from "@/lib/utils"

interface DaySelectorProps {
    startDate?: Date
    endDate?: Date
    activeDay?: Date
    onDaySelect: (date: Date) => void
}

export function DaySelector({ startDate, endDate, activeDay, onDaySelect }: DaySelectorProps) {
    if (!startDate || !endDate) {
        return null
    }

    const days = eachDayOfInterval({ start: startDate, end: endDate })

    return (
        <Card>
            <CardContent className="p-4">
                <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
                    {days.map((day) => {
                        const isActive = activeDay ? isSameDay(day, activeDay) : false
                        return (
                            <Button
                                key={day.toISOString()}
                                variant="ghost"
                                className={cn(
                                    "flex-shrink-0 h-16 w-16 rounded-full p-0 flex flex-col items-center justify-center gap-1",
                                    isActive && "bg-primary text-primary-foreground hover:bg-primary/90"
                                )}
                                onClick={() => onDaySelect(day)}
                            >
                                <span className="text-lg font-medium">
                                    {format(day, 'd')}
                                </span>
                                <span className="text-xs">
                                    {format(day, 'EEE', { locale: ru })}
                                </span>
                            </Button>
                        )
                    })}
                </div>
            </CardContent>
        </Card>
    )
} 