'use client'

import { useParams, useRouter } from "next/navigation";
import { HackathonDetails } from "@/components/HackathonDetails";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";

// Импортируем массив событий
const events = [
    {
        id: 1,
        title: "Хакатон",
        description: "Хакатон — это особый формат соревнования, где участники решают поставленную перед ними задачу за определенный срок.",
        date: "3 декабря 2025 в 08:00",
        type: "hackathon",
        status: "upcoming",
        startDate: "3 декабря 2025",
        endDate: "5 декабря 2025",
        prizePool: {
            first: 35000,
            second: 25000,
            third: 15000
        },
        schedule: [
            {
                date: "10 декабря",
                year: "2024 года",
                items: [
                    {
                        time: "09:00",
                        event: "Начало"
                    },
                    {
                        time: "15:00",
                        endTime: "16:00",
                        event: "Чекпоинт #1"
                    },
                    {
                        time: "20:00",
                        endTime: "21:00",
                        event: "Чекпоинт #2"
                    },
                    {
                        time: "21:00",
                        event: "Стоп-код"
                    }
                ]
            },
            {
                date: "11 декабря",
                year: "2024 года",
                items: [
                    {
                        time: "09:00",
                        event: "Начало"
                    },
                    {
                        time: "15:00",
                        endTime: "16:00",
                        event: "Чекпоинт #1"
                    },
                    {
                        time: "20:00",
                        endTime: "21:00",
                        event: "Чекпоинт #2"
                    },
                    {
                        time: "21:00",
                        event: "Стоп-код"
                    }
                ]
            }
        ],
        team: [
            {
                name: "Сергей Орлов",
                email: "olivia.martin@email.com",
                role: "Тимлид",
                avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Olivia"
            },
            {
                name: "Андрей Петров",
                email: "jackson.lee@email.com",
                role: "Участник",
                avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jackson"
            },
            {
                name: "Анастасия Петрова",
                email: "isabella.nguyen@email.com",
                role: "Участник",
                avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Isabella"
            },
            {
                name: "Анна Ковалева",
                email: "will@email.com",
                role: "Участник",
                avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=William"
            },
            {
                name: "Ирина Колесова",
                email: "sofia.davis@email.com",
                role: "Участник",
                avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sofia"
            }
        ]
    }
];

export default function EventDetails() {
    const params = useParams();
    const router = useRouter();
    const id = params.id;

    // Находим событие по id
    const event = events.find(e => e.id === Number(id));

    if (!event) {
        return (
            <div className="container mx-auto p-6">
                <div className="flex flex-col items-center gap-4">
                    <h1 className="text-2xl font-bold">Мероприятие не найдено</h1>
                    <Button
                        variant="outline"
                        onClick={() => router.push('/myevents')}
                        className="flex items-center gap-2"
                    >
                        <ChevronLeft className="h-4 w-4" />
                        Вернуться к списку
                    </Button>
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
                <Button
                    variant="outline"
                    onClick={() => router.push('/myevents')}
                    className="flex items-center gap-2 mb-6"
                >
                    <ChevronLeft className="h-4 w-4" />
                    Вернуться к списку
                </Button>
            </div>
            <HackathonDetails {...eventData} />
        </div>
    );
} 