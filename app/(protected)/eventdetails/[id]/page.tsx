'use client'

import { useParams, useRouter } from "next/navigation";
import { HackathonDetails } from "@/app/(protected)/eventdetails/components/HackathonDetails";
import { BackButton } from "../components/BackButton";
import { events } from "../data";

export default function EventDetails() {
    const params = useParams();
    const router = useRouter();
    const id = params.id;

    const event = events.find(e => e.id === Number(id));

    if (!event) {
        return (
            <div className="container mx-auto p-6">
                <div className="flex flex-col items-center gap-4">
                    <h1 className="text-2xl font-bold">Мероприятие не найдено</h1>
                    <BackButton />
                </div>
            </div>
        );
    }

    const eventData = {
        title: event.title,
        startDate: event.startDate,
        endDate: event.endDate,
        prizePool: event.prizePool,
        schedule: event.schedule,
        team: event.team
    };

    return (
        <div>
            <div className="container mx-auto py-4">
                <BackButton />
            </div>
            <HackathonDetails {...eventData} />
        </div>
    );
} 