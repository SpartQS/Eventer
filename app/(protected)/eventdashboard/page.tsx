'use client'

import { useQuery } from "@tanstack/react-query"
import { apiEvents, Events } from "@/app/api/http/event/events"
import { Card, CardContent } from "@/components/ui/card"
import { CalendarIcon, MapPinIcon } from "lucide-react"
import Link from "next/link"
import { Skeleton } from "@/components/ui/skeleton"

export default function EventsPage() {
    const { data, isPending, error } = useQuery({
        queryKey: ["Events", { page: 1, page_size: 12 }],
        queryFn: () => apiEvents.getAllEvents({ page: 1, page_size: 12 }),
    })

    const events: Events[] = data?.events ?? []

    function parseDate(dateStr: string) {
        const date = new Date(dateStr); // автоматически парсит ISO строку
        const year = date.getUTCFullYear();
        // const month = date.getUTCMonth() + 1; // месяцы от 0 до 11
        const month = date.toLocaleString('default', {month: 'long'})
        const day = date.getUTCDate();
        
        return `${day} ${month} ${year}`
    }

    if (isPending) {
		return (
			<div className="p-4 sm:p-6">
				<div className="grid items-stretch grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
					{Array.from({ length: 9 }).map((_, idx) => (
						<Card key={idx} className="h-full overflow-hidden flex flex-col">
							<Skeleton className="w-full h-44 sm:h-52" />
							<CardContent className="p-4 sm:p-6 space-y-3 flex-1 flex flex-col">
								<Skeleton className="h-5 w-3/4" />
								<Skeleton className="h-4 w-1/2" />
								<Skeleton className="h-4 w-2/3" />
							</CardContent>
						</Card>
					))}
				</div>
			</div>
		)
    }

    if (error) {
        return <div className="p-6">Ошибка при загрузке событий</div>
    }

    return (
        <div className="p-4 sm:p-6">
            <div className="grid items-stretch grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {events.map((event) => (
                    <Link key={event.id} href={`/eventdashboard/${event.id}`} className="block h-full group" aria-label={`Перейти к событию ${event.event_name}`}>
                        <Card className="h-full overflow-hidden flex flex-col transition hover:shadow-md">
                            <div className="w-full h-44 sm:h-52 relative">
                                <img
                                    src={event.image_url || "/placeholder.svg"}
                                    alt={event.event_name}
                                    className="absolute inset-0 w-full h-full object-cover"
                                />
                            </div>
                            <CardContent className="p-4 sm:p-6 space-y-3 flex-1 flex flex-col">
                                								<h3 className="text-lg font-semibold leading-tight group-hover:underline">
									{event.event_name}
								</h3>
                                <div className="flex items-center text-sm text-muted-foreground gap-2">
                                    <MapPinIcon className="h-4 w-4 flex-shrink-0" />
                                    <span className="truncate">{event.venue}</span>
                                </div>
                                <div className="flex items-center text-sm text-muted-foreground gap-2">
                                    <CalendarIcon className="h-4 w-4 flex-shrink-0" />
                                    <span>{parseDate(event.start_date)} - {parseDate(event.end_date)}</span>
                                </div>
                            </CardContent>
                        </Card>
                    </Link>
                ))}
            </div>
        </div>
    )
} 