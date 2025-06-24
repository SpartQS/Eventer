export interface Hackathon {
    id: number
    title: string
    date: string
    description: string
    prizePool: string
    location: string
    participants: number
    status: "active" | "upcoming" | "completed"
    format: "online" | "offline" | "hybrid"
    image: string
    type: "hackathon" | "contest" | "cybersport"
    organizer: string
    contacts: string
    capacity: number
}

export const hackathons: Hackathon[] = [
    {
        id: 1,
        title: "Хакатон",
        date: "3 декабря 2025 в 08:00",
        description:
            "Хакатон — это особый формат соревнования, где участники решают поставленную перед ними задачу за ограниченный срок. Качество и скорость выполнения задания — это два обязательных составляющих конкурса IT-специалистов. Остальные параметры могут варьироваться в зависимости от формата мероприятия.",
        prizePool: "100 000",
        location: "Москва",
        participants: 150,
        status: "active",
        format: "hybrid",
        image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
        type: "hackathon",
        organizer: "ИТ-компания XYZ",
        contacts: "+7 999 123-45-67, info@xyz.ru",
        capacity: 200
    },
    {
        id: 2,
        title: "Хакатон",
        date: "30 декабря 2025 в 08:00",
        description:
            "Хакатон — это особый формат соревнования, где участники решают поставленную перед ними задачу за ограниченный срок. Качество и скорость выполнения задания — это два обязательных составляющих конкурса IT-специалистов. Остальные параметры могут варьироваться в зависимости от формата мероприятия.",
        prizePool: "100 000",
        location: "Санкт-Петербург",
        participants: 120,
        status: "upcoming",
        format: "offline",
        image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
        type: "hackathon",
        organizer: "Digital Event Group",
        contacts: "+7 812 555-12-34, spb@deg.ru",
        capacity: 140
    },
    {
        id: 3,
        title: "Хакатон",
        date: "3 декабря 2025 в 08:00",
        description:
            "Хакатон — это особый формат соревнования, где участники решают поставленную перед ними задачу за ограниченный срок. Качество и скорость выполнения задания — это два обязательных составляющих конкурса IT-специалистов. Остальные параметры могут варьироваться в зависимости от формата мероприятия.",
        prizePool: "100 000",
        location: "Екатеринбург",
        participants: 200,
        status: "active",
        format: "online",
        image: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
        type: "hackathon",
        organizer: "Уральский IT-центр",
        contacts: "+7 343 777-77-77, ural@itcenter.ru",
        capacity: 250
    },
] 