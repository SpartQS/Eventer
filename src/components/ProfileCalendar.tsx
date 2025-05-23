import * as React from "react"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar as CalendarIcon } from "lucide-react"

export function ProfileCalendar() {
    const [date, setDate] = React.useState<Date | undefined>(new Date())

    return (
        <Card className="bg-white border border-gray-200">
            <CardHeader className="pb-4">
                <CardTitle className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                    <CalendarIcon className="h-5 w-5" />
                    Календарь
                </CardTitle>
            </CardHeader>
            <CardContent className="flex justify-center">
                <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    className="rounded-md border shadow"
                />
            </CardContent>
        </Card>
    )
} 