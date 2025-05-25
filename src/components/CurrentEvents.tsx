import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

interface EventItem {
    team: string
    event: string
    stage: string
}

export function CurrentEvents() {
    const currentEvents: EventItem[] = [
        {
            team: "Horizon",
            event: "Хакатон",
            stage: "Стадия 1",
        },
        {
            team: "Fly",
            event: "Хакатон",
            stage: "Стадия 2",
        },
    ]

    return (
        <Card className="bg-card text-card-foreground border-border h-[300px] w-full">
            <CardHeader className="pb-4">
                <CardTitle className="text-2xl font-semibold text-foreground">Текущие мероприятия</CardTitle>
            </CardHeader>
            <CardContent className="h-[calc(100%-60px)] overflow-y-auto">
                <div className="overflow-x-auto">
                    <Table>
                        <TableHeader>
                            <TableRow className="border-border">
                                <TableHead className="text-base text-muted-foreground font-medium w-1/3">Команда</TableHead>
                                <TableHead className="text-base text-muted-foreground font-medium w-1/3">Мероприятие</TableHead>
                                <TableHead className="text-base text-muted-foreground font-medium w-1/3">Этап</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {currentEvents.map((event, index) => (
                                <TableRow key={index} className="border-border hover:bg-accent/50">
                                    <TableCell className="text-base font-medium text-foreground truncate">{event.team}</TableCell>
                                    <TableCell className="text-base text-muted-foreground">
                                        <Badge variant="secondary" className="text-base bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100 hover:bg-blue-100 dark:hover:bg-blue-900">
                                            {event.event}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-base text-muted-foreground truncate">{event.stage}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </CardContent>
        </Card>
    )
} 