'use client'

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { format as formatDate, isValid } from "date-fns"
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

interface CheckpointModalProps {
    isOpen: boolean
    onOpenChange: (open: boolean) => void
    checkpointId?: number
    onSave: (checkpoint: {
        title: string
        subtitle: string
        startTime: string
        endTime: string
        description: string
        format: 'online' | 'offline' | 'hybrid'
    }) => void
    selectedDate?: Date
    checkpoints?: Checkpoint[]
}

export function CheckpointModal({
    isOpen,
    onOpenChange,
    checkpointId,
    onSave,
    selectedDate,
    checkpoints = []
}: CheckpointModalProps) {
    const [title, setTitle] = useState('')
    const [subtitle, setSubtitle] = useState('')
    const [startTime, setStartTime] = useState('')
    const [endTime, setEndTime] = useState('')
    const [description, setDescription] = useState('')
    const [format, setFormat] = useState<'online' | 'offline' | 'hybrid'>('offline')

    useEffect(() => {
        if (checkpointId) {
            const checkpoint = checkpoints.find(cp => cp.id === checkpointId)
            if (checkpoint) {
                setTitle(checkpoint.title)
                setSubtitle(checkpoint.subtitle)
                setStartTime(checkpoint.startTime)
                setEndTime(checkpoint.endTime)
                setDescription(checkpoint.description)
                setFormat(checkpoint.format)
            }
        } else {
            // Сброс формы при создании нового чекпоинта
            setTitle('')
            setSubtitle('')
            setStartTime('')
            setEndTime('')
            setDescription('')
            setFormat('offline')
        }
    }, [checkpointId, isOpen, checkpoints])

    const handleSave = () => {
        onSave({
            title,
            subtitle,
            startTime,
            endTime,
            description,
            format
        })
    }

    const formatDateSafe = (date: Date | undefined) => {
        if (!date) return ''
        const dateObj = new Date(date)
        return isValid(dateObj)
            ? formatDate(dateObj, 'd MMMM yyyy', { locale: ru })
            : 'Неверная дата'
    }

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-md">
                <DialogHeader>
                    <DialogTitle className="text-xl text-center">
                        {checkpointId ? `Редактирование чекпоинта №${checkpointId}` : 'Новый чекпоинт'}
                    </DialogTitle>
                </DialogHeader>
                <div className="space-y-4 pt-4">
                    <div className="space-y-2">
                        <Label htmlFor="checkpoint-name" className="text-base">Название чекпоинта</Label>
                        <Input
                            id="checkpoint-name"
                            placeholder="Введите название чекпоинта"
                            className="text-base"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="event-format" className="text-base">Формат мероприятия</Label>
                        <Select value={format} onValueChange={(value: 'online' | 'offline' | 'hybrid') => setFormat(value)}>
                            <SelectTrigger className="text-base">
                                <SelectValue placeholder="Выбрать" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="online">Онлайн</SelectItem>
                                <SelectItem value="offline">Оффлайн</SelectItem>
                                <SelectItem value="hybrid">Гибридный</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="start-time" className="text-base">Начало</Label>
                            <Input
                                id="start-time"
                                type="time"
                                value={startTime}
                                onChange={(e) => setStartTime(e.target.value)}
                                className="text-base"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="end-time" className="text-base">Конец</Label>
                            <Input
                                id="end-time"
                                type="time"
                                value={endTime}
                                onChange={(e) => setEndTime(e.target.value)}
                                className="text-base"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="description" className="text-base">Описание</Label>
                        <Textarea
                            id="description"
                            placeholder="Введите описание чекпоинта"
                            className="min-h-[100px] text-base"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>

                    {selectedDate && (
                        <div className="text-sm text-muted-foreground">
                            Дата: {formatDateSafe(selectedDate)}
                        </div>
                    )}

                    <div className="flex justify-between pt-4">
                        <Button
                            variant="outline"
                            onClick={() => onOpenChange(false)}
                            className="text-base"
                        >
                            Отмена
                        </Button>
                        <Button
                            onClick={handleSave}
                            className="text-base"
                            disabled={!title || !startTime || !endTime}
                        >
                            {checkpointId ? 'Сохранить' : 'Создать'}
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
} 