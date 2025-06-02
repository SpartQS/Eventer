'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface StatusControlProps {
    currentStatus: string
    onStatusChange: (status: string) => void
}

export function StatusControl({ currentStatus, onStatusChange }: StatusControlProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-xl">Контроль статуса</CardTitle>
            </CardHeader>
            <CardContent>
                <Tabs defaultValue="draft" className="w-full">
                    <TabsList className="text-base">
                        <TabsTrigger
                            value="draft"
                            onClick={() => onStatusChange("Черновик")}
                        >
                            Черновик
                        </TabsTrigger>
                        <TabsTrigger
                            value="published"
                            onClick={() => onStatusChange("Опубликован")}
                        >
                            Опубликован
                        </TabsTrigger>
                        <TabsTrigger
                            value="completed"
                            onClick={() => onStatusChange("Завершен")}
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
    )
} 