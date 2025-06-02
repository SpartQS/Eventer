export const events = [
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
                        event: "Начало второго дня"
                    },
                    {
                        time: "14:00",
                        endTime: "15:00",
                        event: "Чекпоинт #3"
                    },
                    {
                        time: "19:00",
                        endTime: "20:00",
                        event: "Чекпоинт #4"
                    },
                    {
                        time: "20:00",
                        event: "Финальный стоп-код"
                    },
                    {
                        time: "21:00",
                        event: "Подведение итогов"
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