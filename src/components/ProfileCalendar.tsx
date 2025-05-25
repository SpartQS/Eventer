import * as React from "react"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar as CalendarIcon } from "lucide-react"

export function ProfileCalendar() {
    const [date, setDate] = React.useState<Date | undefined>(new Date())

    return (
        <Card className="bg-card text-card-foreground border-border h-[450px] flex-1">
            <CardHeader>
                <CardTitle className="text-xl font-semibold text-foreground flex items-center gap-2">
                    <CalendarIcon className="h-5 w-5" />
                    Календарь
                </CardTitle>
            </CardHeader>
            <CardContent className="flex justify-center items-center h-[calc(100%-60px)]">
                <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    className="rounded-md border border-border bg-card text-card-foreground shadow-sm"
                />
            </CardContent>
        </Card>
    )
} 