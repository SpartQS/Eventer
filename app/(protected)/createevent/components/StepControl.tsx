'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface StepControlProps {
    currentStep: number
    totalSteps: number
    onNext: () => void
    onBack: () => void
    isLastStep: boolean
    onSave?: () => void
}

export function StepControl({
    currentStep,
    totalSteps,
    onNext,
    onBack,
    isLastStep,
    onSave
}: StepControlProps) {
    return (
        <Card>
            <CardContent className="p-6">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Button
                            variant="outline"
                            onClick={onBack}
                            disabled={currentStep === 1}
                            className="flex items-center gap-2"
                        >
                            <ChevronLeft className="h-4 w-4" />
                            Назад
                        </Button>
                        <span className="text-sm text-muted-foreground">
                            Шаг {currentStep} из {totalSteps}
                        </span>
                    </div>
                    <Button
                        onClick={isLastStep ? onSave : onNext}
                        className="flex items-center gap-2"
                    >
                        {isLastStep ? 'Сохранить' : 'Далее'}
                        {!isLastStep && <ChevronRight className="h-4 w-4" />}
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
} 