"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { BasicSettings } from "./components/BasicSettings"
import { CheckpointList } from "./components/CheckpointList"
import { CheckpointModal } from "./components/CheckpointModal"
import { StatusControl } from "./components/StatusControl"
import { DocumentUpload } from "./components/DocumentUpload"
import { StepControl } from "./components/StepControl"
import { DaySelector } from "./components/DaySelector"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "sonner"
import { RoleGuard } from "@/components/role-guard"

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

export default function CreateEvent() {
    const [currentStep, setCurrentStep] = useState(1)
    const [currentStatus, setCurrentStatus] = useState("Черновик")
    const [isCheckpointModalOpen, setIsCheckpointModalOpen] = useState(false)
    const [editingCheckpoint, setEditingCheckpoint] = useState<number | null>(null)
    const [startDate, setStartDate] = useState<Date>()
    const [endDate, setEndDate] = useState<Date>()
    const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined)
    const [checkpoints, setCheckpoints] = useState<Checkpoint[]>([])

    const totalSteps = 4

    const handleNext = () => {
        if (currentStep === 1 && (!startDate || !endDate)) {
            toast.error("Пожалуйста, выберите даты начала и окончания мероприятия")
            return
        }
        if (currentStep === 2 && checkpoints.length === 0) {
            toast.error("Добавьте хотя бы один чекпоинт")
            return
        }
        if (currentStep < totalSteps) {
            setCurrentStep(currentStep + 1)
        }
    }

    const handleBack = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1)
        }
    }

    const handleAddCheckpoint = () => {
        if (!selectedDate) {
            toast.error("Пожалуйста, выберите день для добавления чекпоинта")
            return
        }
        setEditingCheckpoint(null)
        setIsCheckpointModalOpen(true)
    }

    const handleEditCheckpoint = (id: number) => {
        setEditingCheckpoint(id)
        setIsCheckpointModalOpen(true)
    }

    const handleSaveCheckpoint = (checkpoint: {
        title: string
        subtitle: string
        startTime: string
        endTime: string
        description: string
        format: 'online' | 'offline' | 'hybrid'
    }) => {
        if (editingCheckpoint) {
            // Редактирование существующего чекпоинта
            setCheckpoints(prev => prev.map(cp =>
                cp.id === editingCheckpoint
                    ? { ...cp, ...checkpoint }
                    : cp
            ))
        } else {
            // Создание нового чекпоинта
            const newCheckpoint = {
                id: checkpoints.length > 0
                    ? Math.max(...checkpoints.map(cp => cp.id)) + 1
                    : 1,
                ...checkpoint,
                date: selectedDate!
            }
            setCheckpoints(prev => [...prev, newCheckpoint])
        }
        setIsCheckpointModalOpen(false)
        setEditingCheckpoint(null)
    }

    const handleFileUpload = (file: File, type: 'regulation' | 'task') => {
        // Здесь будет логика загрузки файла
        console.log('Загрузка файла:', file.name, type)
    }

    const handleSave = () => {
        // Здесь будет логика сохранения всего мероприятия
        console.log('Сохранение мероприятия')
    }

    const handleDaySelect = (date: Date) => {
        setSelectedDate(date)
    }

    const renderStep = () => {
        switch (currentStep) {
            case 1:
                return (
                    <div className="space-y-6">
                        <h2 className="text-xl font-semibold">Базовые настройки</h2>
                        <BasicSettings
                            startDate={startDate}
                            endDate={endDate}
                            onStartDateChange={setStartDate}
                            onEndDateChange={setEndDate}
                        />
                    </div>
                )
            case 2:
                return (
                    <div className="space-y-8">
                        <h2 className="text-xl font-semibold">Этапы мероприятия</h2>
                        <DaySelector
                            startDate={startDate}
                            endDate={endDate}
                            activeDay={selectedDate}
                            onDaySelect={handleDaySelect}
                        />
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-xl">Чекпоинты</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <CheckpointList
                                    stages={checkpoints}
                                    onAddCheckpoint={handleAddCheckpoint}
                                    onEditCheckpoint={handleEditCheckpoint}
                                    selectedDate={selectedDate}
                                />
                            </CardContent>
                        </Card>
                    </div>
                )
            case 3:
                return (
                    <div className="space-y-4">
                        <h2 className="text-xl font-semibold">Загрузка документов</h2>
                        <DocumentUpload onFileUpload={handleFileUpload} />
                    </div>
                )
            case 4:
                return (
                    <div className="space-y-4">
                        <h2 className="text-xl font-semibold">Статус мероприятия</h2>
                        <StatusControl
                            currentStatus={currentStatus}
                            onStatusChange={setCurrentStatus}
                        />
                    </div>
                )
            default:
                return null
        }
    }

    return (
        <RoleGuard>
            <div className="container mx-auto px-4 py-8 max-w-7xl">
                <div className="flex flex-col gap-8">
                    <div className="flex flex-col gap-4">
                        <h1 className="text-3xl font-bold">Создание мероприятия</h1>
                    </div>

                    <div className="space-y-8">
                        {renderStep()}

                        <StepControl
                            currentStep={currentStep}
                            totalSteps={totalSteps}
                            onNext={handleNext}
                            onBack={handleBack}
                            isLastStep={currentStep === totalSteps}
                            onSave={handleSave}
                        />
                    </div>

                    <CheckpointModal
                        isOpen={isCheckpointModalOpen}
                        onOpenChange={setIsCheckpointModalOpen}
                        checkpointId={editingCheckpoint || undefined}
                        onSave={handleSaveCheckpoint}
                        selectedDate={selectedDate}
                        checkpoints={checkpoints}
                    />
                </div>
            </div>
        </RoleGuard>
    )
} 