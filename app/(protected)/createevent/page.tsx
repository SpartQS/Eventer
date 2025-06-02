"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CalendarIcon, ChevronLeft, ChevronRight, Plus } from "lucide-react"
import { cn } from "@/lib/utils"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { ru } from "date-fns/locale"

export default function CreateEvent() {
    const [ActiveStage, setActiveStage] = useState(1)
    const [currentStatus, setCurrentStatus] = useState("Черновик")
    const [isCheckpointModalOpen, setIsCheckpointModalOpen] = useState(false)
    const [editingCheckpoint, setEditingCheckpoint] = useState<number | null>(null)
    const [isNewCheckpointModalOpen, setIsNewCheckpointModalOpen] = useState(false)
    const [startDate, setStartDate] = useState<Date>()
    const [endDate, setEndDate] = useState<Date>()
    const scrollContainerRef = useRef<HTMLDivElement>(null)

    const scrollToCheckpoint = (direction: 'left' | 'right') => {
        if (scrollContainerRef.current) {
            const scrollAmount = 300 + 16 // ширина карточки + отступ
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

    const stages = [
        {
            id: 1,
            title: "Чекпоинт №1",
            subtitle: "Оффлайн",
            date: "7 мая 2023",
            time: "13:00 - 14:00",
            description:
                "Хватит — это особый формат презентации, где каждый слайд показывается ровно 20 секунд и автоматически сменяется следующим. Такой формат заставляет выступающего быть лаконичным и четким в изложении материала.",
        },
        {
            id: 2,
            title: "Чекпоинт №2",
            subtitle: "Оффлайн",
            date: "7 мая 2023",
            time: "13:00 - 14:00",
            description:
                "Хватит — это особый формат презентации, где каждый слайд показывается ровно 20 секунд и автоматически сменяется следующим. Такой формат заставляет выступающего быть лаконичным и четким в изложении материала.",
        },
        {
            id: 3,
            title: "Чекпоинт №3",
            subtitle: "Оффлайн",
            date: "7 мая 2023",
            time: "13:00 - 14:00",
            description:
                "Хватит — это особый формат презентации, где каждый слайд показывается ровно 20 секунд и автоматически сменяется следующим. Такой формат заставляет выступающего быть лаконичным и четким в изложении материала.",
        },
        {
            id: 4,
            title: "Чекпоинт №4",
            subtitle: "Оффлайн",
            date: "7 мая 2023",
            time: "13:00 - 14:00",
            description:
                "Хватит — это особый формат презентации, где каждый слайд показывается ровно 20 секунд и автоматически сменяется следующим. Такой формат заставляет выступающего быть лаконичным и четким в изложении материала.",
        },
        {
            id: 5,
            title: "Чекпоинт №5",
            subtitle: "Оффлайн",
            date: "7 мая 2023",
            time: "13:00 - 14:00",
            description:
                "Хватит — это особый формат презентации, где каждый слайд показывается ровно 20 секунд и автоматически сменяется следующим. Такой формат заставляет выступающего быть лаконичным и четким в изложении материала.",
        },
    ]

    const handleAddCheckpoint = () => {
        setIsNewCheckpointModalOpen(true)
    }

    const handleEditCheckpoint = (id: number) => {
        setEditingCheckpoint(id)
        setIsCheckpointModalOpen(true)
    }

    return (
        <div className="container py-8">
            <div className="flex flex-col gap-8">
                <div className="flex flex-col gap-4">
                    <h1 className="text-3xl font-bold">Создание мероприятия</h1>
                </div>

                {/* Базовые настройки */}
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
                                                    onSelect={setStartDate}
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
                                                    onSelect={setEndDate}
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
                                        placeholder="Введите описание работы"
                                        className="min-h-[120px] text-base"
                                    />
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Создание этапов */}
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle className="text-xl">Создание этапов</CardTitle>
                        <Button
                            variant="outline"
                            size="sm"
                            className="gap-2 text-base"
                            onClick={handleAddCheckpoint}
                        >
                            <Plus className="h-4 w-4" />
                            Добавить чекпоинт
                        </Button>
                    </CardHeader>
                    <CardContent>
                        {/* Stage Numbers */}
                        <div className="flex items-center justify-center space-x-4 mb-8">
                            {[1, 2, 3, 4, 5, 6].map((num) => (
                                <button
                                    key={num}
                                    onClick={() => setActiveStage(num)}
                                    className={cn(
                                        "w-10 h-10 rounded-full border-2 flex items-center justify-center text-base font-medium transition-colors",
                                        num <= 3
                                            ? "bg-primary text-primary-foreground border-primary"
                                            : "bg-background text-muted-foreground border-border hover:border-primary",
                                    )}
                                >
                                    {num}
                                </button>
                            ))}
                        </div>

                        {/* Stage Cards */}
                        <div className="relative">
                            <div className="flex items-center">
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="text-muted-foreground hover:text-foreground shrink-0"
                                    onClick={() => scrollToCheckpoint('left')}
                                >
                                    <ChevronLeft className="h-4 w-4" />
                                </Button>

                                <div className="flex-1 mx-4 max-w-[calc(300px*4+1rem*3)]">
                                    <div
                                        ref={scrollContainerRef}
                                        className="flex gap-4 overflow-x-auto pb-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
                                    >
                                        {stages.map((stage) => (
                                            <Card
                                                key={stage.id}
                                                className="cursor-pointer hover:bg-accent transition-colors shrink-0 w-[300px]"
                                                onClick={() => handleEditCheckpoint(stage.id)}
                                            >
                                                <CardHeader className="pb-3">
                                                    <div className="flex items-center justify-between">
                                                        <CardTitle className="text-base">{stage.title}</CardTitle>
                                                        <span className="text-sm text-muted-foreground">{stage.subtitle}</span>
                                                    </div>
                                                    <div className="text-sm text-muted-foreground">
                                                        {stage.date} • {stage.time}
                                                    </div>
                                                </CardHeader>
                                                <CardContent className="pt-0">
                                                    <p className="text-sm text-muted-foreground line-clamp-10">{stage.description}</p>
                                                </CardContent>
                                            </Card>
                                        ))}
                                    </div>
                                </div>

                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="text-muted-foreground hover:text-foreground shrink-0"
                                    onClick={() => scrollToCheckpoint('right')}
                                >
                                    <ChevronRight className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Загрузка документов */}
                <Card>
                    <CardHeader>
                        <CardTitle className="text-xl">Загрузка документов</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <Label className="text-base mb-4 block">Регламент</Label>
                                <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                                    <p className="text-base text-muted-foreground mb-4">
                                        Перетащите файлы сюда или нажмите для выбора
                                        <br />
                                        PDF, DOC до 10 МБ
                                    </p>
                                </div>
                                <div className="mt-4 space-y-4">
                                    <Label htmlFor="regulation-file" className="text-base text-muted-foreground">
                                        Загруженные файлы
                                    </Label>
                                    <Input
                                        id="regulation-file"
                                        defaultValue="pravila.pdf"
                                        className="text-base"
                                    />
                                </div>
                            </div>
                            <div>
                                <Label className="text-base mb-4 block">Задание</Label>
                                <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                                    <p className="text-base text-muted-foreground mb-4">
                                        Перетащите файлы сюда или нажмите для выбора
                                        <br />
                                        PDF, DOC до 20 МБ
                                    </p>
                                </div>
                                <div className="mt-4 space-y-4">
                                    <Label htmlFor="task-file" className="text-base text-muted-foreground">
                                        Загруженные файлы
                                    </Label>
                                    <Input
                                        id="task-file"
                                        defaultValue="pravila.pdf"
                                        className="text-base"
                                    />
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Контроль статуса */}
                <Card>
                    <CardHeader>
                        <CardTitle className="text-xl">Контроль статуса</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Tabs defaultValue="draft" className="w-full">
                            <TabsList className="text-base">
                                <TabsTrigger
                                    value="draft"
                                    onClick={() => setCurrentStatus("Черновик")}
                                >
                                    Черновик
                                </TabsTrigger>
                                <TabsTrigger
                                    value="published"
                                    onClick={() => setCurrentStatus("Опубликован")}
                                >
                                    Опубликован
                                </TabsTrigger>
                                <TabsTrigger
                                    value="completed"
                                    onClick={() => setCurrentStatus("Завершен")}
                                >
                                    Завершить
                                </TabsTrigger>
                            </TabsList>
                            <div className="mt-4">
                                <span className="text-base text-muted-foreground">Текущий статус: </span>
                                <span className="text-base">{currentStatus}</span>
                            </div>
                        </Tabs>
                    </CardContent>
                </Card>

                {/* Checkpoint Edit Modal */}
                <Dialog open={isCheckpointModalOpen} onOpenChange={setIsCheckpointModalOpen}>
                    <DialogContent className="max-w-md">
                        <DialogHeader>
                            <DialogTitle className="text-xl text-center">Чекпоинт №{editingCheckpoint}</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4 pt-4">
                            <div className="space-y-2">
                                <Label htmlFor="checkpoint-name" className="text-base">Название чекпоинта</Label>
                                <Input
                                    id="checkpoint-name"
                                    placeholder="Введите название чекпоинта"
                                    className="text-base"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="event-format" className="text-base">Формат мероприятия</Label>
                                <Select>
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
                                        defaultValue="09:00"
                                        className="text-base"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="end-time" className="text-base">Конец</Label>
                                    <Input
                                        id="end-time"
                                        type="time"
                                        defaultValue="11:00"
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
                                />
                            </div>

                            <div className="flex justify-between pt-4">
                                <Button
                                    variant="outline"
                                    onClick={() => setIsCheckpointModalOpen(false)}
                                    className="text-base"
                                >
                                    Отмена
                                </Button>
                                <Button
                                    onClick={() => setIsCheckpointModalOpen(false)}
                                    className="text-base"
                                >
                                    Сохранить
                                </Button>
                            </div>
                        </div>
                    </DialogContent>
                </Dialog>

                {/* New Checkpoint Modal */}
                <Dialog open={isNewCheckpointModalOpen} onOpenChange={setIsNewCheckpointModalOpen}>
                    <DialogContent className="max-w-md">
                        <DialogHeader>
                            <DialogTitle className="text-xl text-center">Новый чекпоинт</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4 pt-4">
                            <div className="space-y-2">
                                <Label htmlFor="new-checkpoint-name" className="text-base">Название чекпоинта</Label>
                                <Input
                                    id="new-checkpoint-name"
                                    placeholder="Введите название чекпоинта"
                                    className="text-base"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="new-event-format" className="text-base">Формат мероприятия</Label>
                                <Select>
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
                                    <Label htmlFor="new-start-time" className="text-base">Начало</Label>
                                    <Input
                                        id="new-start-time"
                                        type="time"
                                        defaultValue="09:00"
                                        className="text-base"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="new-end-time" className="text-base">Конец</Label>
                                    <Input
                                        id="new-end-time"
                                        type="time"
                                        defaultValue="11:00"
                                        className="text-base"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="new-description" className="text-base">Описание</Label>
                                <Textarea
                                    id="new-description"
                                    placeholder="Введите описание чекпоинта"
                                    className="min-h-[100px] text-base"
                                />
                            </div>

                            <div className="flex justify-between pt-4">
                                <Button
                                    variant="outline"
                                    onClick={() => setIsNewCheckpointModalOpen(false)}
                                    className="text-base"
                                >
                                    Отмена
                                </Button>
                                <Button
                                    onClick={() => setIsNewCheckpointModalOpen(false)}
                                    className="text-base"
                                >
                                    Создать
                                </Button>
                            </div>
                        </div>
                    </DialogContent>
                </Dialog>

                {/* Action Buttons */}
                <div className="flex justify-end space-x-4">
                    <Button variant="outline" className="text-base">
                        Отмена
                    </Button>
                    <Button className="text-base">Сохранить</Button>
                </div>
            </div>
        </div>
    )
} 