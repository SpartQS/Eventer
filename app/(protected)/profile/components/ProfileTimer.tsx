'use client';

import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Clock, ArrowLeftRight } from "lucide-react"
import { apiUsers } from "@/app/api/http/users/users";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

export function ProfileTimer() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [countdown, setCountdown] = useState<string>('');

    const { data: stages, error, isPending } = useQuery({
        queryKey: ['stages'],
        queryFn: () => apiUsers.getUpcomingStages(),
    });

    const currentStage = stages?.stages[currentIndex]; 

    useEffect(() => {
        if (!currentStage) return;

        const interval = setInterval(() => {
            setCountdown(formatTimeDifference(currentStage.start_date));
        }, 1000);

        return () => clearInterval(interval);
    }, [currentStage]);

    function parseDate(dateStr: string): Date {
        const [datePart, timePart] = dateStr.split(' ');
        const [day, month, year] = datePart.split('.').map(Number);
        const [hours, minutes, seconds] = timePart.split(':').map(Number);
        return new Date(year, month - 1, day, hours, minutes, seconds);
        // return `${year}-${month - 1}-${day - 1} ${hours}:${minutes}:${seconds}`;
    }

    function formatTimeDifference(startDateStr: string): string {
        const startDate = parseDate(startDateStr);
        const now = new Date();
        const diffMs = startDate.getTime() - now.getTime();

        if (isNaN(diffMs)) return 'Некорректная дата';
        if (diffMs <= 0) return 'Уже началось';

        const diffSeconds = Math.floor(diffMs / 1000);
        const days = Math.floor(diffSeconds / (60 * 60 * 24));
        const hours = Math.floor((diffSeconds % (60 * 60 * 24)) / 3600);
        const minutes = Math.floor((diffSeconds % 3600) / 60);
        const seconds = diffSeconds % 60;

        return [
            days > 0 ? `${days}:` : '00',
            hours > 0 ? `${hours}:` : '00',
            `${minutes}:`,
            `${seconds}`,
        ]
            .filter(Boolean)
            .join('');
    }

    const handleNext = () => {
        if (stages && currentIndex < stages.stages.length - 1) {
            setCurrentIndex((prev) => prev + 1);
        }
    };

    const handlePrev = () => {
        if (currentIndex > 0) {
            setCurrentIndex((prev) => prev - 1);
        }
    };

    // if (error) return <div>Нет ближайших мероприятий</div>;
    if (error) return <Card>
        <CardContent className="flex flex-col justify-center items-center h-[calc(100%-60px)] space-y-3 md:space-y-4">
            Нет найдено мероприятий
        </CardContent>
        </Card>;
    if (!currentStage) return <Card>
    <CardContent className="flex flex-col justify-center items-center h-[calc(100%-60px)] space-y-3 md:space-y-4">
        Этап не найден
    </CardContent>
    </Card>;
    // if (!currentStage) return <div>Этап не найден</div>;

    return (
        <Card className="bg-card text-card-foreground border-border h-[350px] md:h-[450px] flex-1 min-w-0">
            <CardHeader>
                <CardTitle className="text-2xl font-semibold text-foreground flex items-center gap-2">
                    <Clock className="h-6 w-6" />
                    Таймер
                </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col justify-center items-center h-[calc(100%-60px)] space-y-3 md:space-y-4">
                    <div className="text-base md:text-lg font-medium text-foreground mb-2 text-center">
                        {currentStage?.title}
                    </div>
                    <div className="flex flex-col items-center gap-2">
                        <div className="flex items-center gap-2 md:gap-4">
                            <div className="text-4xl md:text-4xl font-mono font-bold">
                                {countdown}
                            </div>
                            <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.6)] transition-all"></div>
                        </div>
                        <div className="text-xs md:text-sm text-muted-foreground">
                            Время до следующей стадии
                        </div>
                    </div>
                    <div style={{ marginTop: '1rem' }}>
                        <button onClick={handlePrev} disabled={currentIndex === 0}>
                        Назад
                        </button>
                        <button onClick={handleNext} disabled={currentIndex === (stages?.stages.length ?? 0) - 1} style={{ marginLeft: '1rem' }}>
                        Далее
                        </button>
                    </div>
            </CardContent>
        </Card>
    )
} 