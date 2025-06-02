'use client'

import { useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChevronLeft, ChevronRight, Plus } from "lucide-react"
import { format as formatDate, isSameDay, isValid } from "date-fns"
import { ru } from "date-fns/locale"

interface Checkpoint {
    id: number
    title: string
    subtitle: string
    date: Date
    startTime: string
    endTime: string
    description: string
    format: 'online' | 'offline' | 'hybrid'
}

interface CheckpointListProps {
    stages: Checkpoint[]
    onAddCheckpoint: () => void
    onEditCheckpoint: (id: number) => void
    selectedDate: Date | undefined
}

export function CheckpointList({ stages, onAddCheckpoint, onEditCheckpoint, selectedDate }: CheckpointListProps) {
    const scrollContainerRef = useRef<HTMLDivElement>(null)

    const scrollToCheckpoint = (direction: 'left' | 'right') => {
        if (scrollContainerRef.current) {
            const scrollAmount = 320 + 16
            const currentScroll = scrollContainerRef.current.scrollLeft
            const newScroll = direction === 'left'
                ? currentScroll - scrollAmount
                : currentScroll + scrollAmount
            scrollContainerRef.current.scrollTo({
                left: newScroll,
                behavior: 'smooth'
            })
        }
    }

    // Фильтруем чекпоинты по выбранной дате
    const filteredStages = selectedDate
        ? stages.filter(stage => {
            const stageDate = new Date(stage.date)
            return isValid(stageDate) && isSameDay(stageDate, selectedDate)
        })
        : stages

    const formatDateSafe = (date: Date) => {
        const dateObj = new Date(date)
        return isValid(dateObj)
            ? formatDate(dateObj, 'd MMMM yyyy', { locale: ru })
            : 'Неверная дата'
    }

    return (
        <div className="relative w-full">
            {stages.length > 0 && (
                <>
                    <div className="absolute -left-4 top-1/2 -translate-y-1/2 z-10">
                        <Button
                            variant="outline"
                            size="icon"
                            onClick={() => scrollToCheckpoint('left')}
                            className="rounded-full bg-background/80 backdrop-blur-sm"
                        >
                            <ChevronLeft className="h-4 w-4" />
                        </Button>
                    </div>
                    <div className="absolute -right-4 top-1/2 -translate-y-1/2 z-10">
                        <Button
                            variant="outline"
                            size="icon"
                            onClick={() => scrollToCheckpoint('right')}
                            className="rounded-full bg-background/80 backdrop-blur-sm"
                        >
                            <ChevronRight className="h-4 w-4" />
                        </Button>
                    </div>
                </>
            )}
            <div
                ref={scrollContainerRef}
                className="flex gap-4 overflow-x-auto pb-4 px-16 scrollbar-hide snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
            >
                {filteredStages.map((stage) => (
                    <Card
                        key={stage.id}
                        className="w-[320px] h-[320px] flex-shrink-0 cursor-pointer hover:bg-accent/50 transition-colors snap-start"
                        onClick={() => onEditCheckpoint(stage.id)}
                    >
                        <CardHeader className="pb-2">
                            <div className="flex items-center justify-between">
                                <CardTitle className="text-lg line-clamp-1">{stage.title}</CardTitle>
                                <span className="text-sm text-muted-foreground line-clamp-1">{stage.subtitle}</span>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-2">
                                <p className="text-sm text-muted-foreground">
                                    {formatDateSafe(stage.date)}
                                </p>
                                <p className="text-sm text-muted-foreground">
                                    {stage.startTime} - {stage.endTime}
                                </p>
                                <p className="text-sm text-muted-foreground line-clamp-8">
                                    {stage.description}
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                ))}
                <Card
                    className="w-[320px] h-[320px] flex-shrink-0 cursor-pointer hover:bg-accent/50 transition-colors border-dashed snap-start"
                    onClick={onAddCheckpoint}
                >
                    <CardHeader>
                        <CardTitle className="text-lg flex items-center gap-2">
                            <Plus className="h-4 w-4" />
                            Добавить чекпоинт
                        </CardTitle>
                    </CardHeader>
                </Card>
            </div>
        </div>
    )
} 