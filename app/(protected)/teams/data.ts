export interface Team {
    id: string
    name: string
    description: string
    avatar?: string
    membersCount: number
    maxMembers: number
    createdAt: string
    status: "active" | "inactive"
    events: string[]
    members: TeamMember[]
}

export interface TeamMember {
    id: string
    name: string
    email: string
    role: "leader" | "member"
    avatar?: string
    joinedAt: string
}

export const mockTeams: Team[] = [
    {
        id: "1",
        name: "Tech Innovators",
        description: "Команда разработчиков, специализирующаяся на веб-технологиях и мобильных приложениях. Мы создаем инновационные решения для современных задач.",
        avatar: "/api/placeholder/80/80",
        membersCount: 3,
        maxMembers: 4,
        createdAt: "2024-01-15",
        status: "active",
        events: ["Хакатон 2024", "AI Challenge"],
        members: [
            {
                id: "1",
                name: "Александр Петров",
                email: "alex@example.com",
                role: "leader",
                joinedAt: "2024-01-15"
            },
            {
                id: "2",
                name: "Мария Сидорова",
                email: "maria@example.com",
                role: "member",
                joinedAt: "2024-01-16"
            },
            {
                id: "3",
                name: "Дмитрий Козлов",
                email: "dmitry@example.com",
                role: "member",
                joinedAt: "2024-01-17"
            },
        ]
    },
    {
        id: "2",
        name: "Data Masters",
        description: "Эксперты в области анализа данных и машинного обучения. Специализируемся на создании интеллектуальных систем.",
        membersCount: 4,
        maxMembers: 4,
        createdAt: "2024-02-01",
        status: "active",
        events: ["Data Science Hackathon"],
        members: [
            {
                id: "4",
                name: "Елена Волкова",
                email: "elena@example.com",
                role: "leader",
                joinedAt: "2024-02-01"
            },
            {
                id: "5",
                name: "Игорь Морозов",
                email: "igor@example.com",
                role: "member",
                joinedAt: "2024-02-02"
            },
            {
                id: "6",
                name: "Анна Соколова",
                email: "anna@example.com",
                role: "member",
                joinedAt: "2024-02-03"
            },
            {
                id: "7",
                name: "Сергей Новиков",
                email: "sergey@example.com",
                role: "member",
                joinedAt: "2024-02-04"
            }
        ]
    },
    {
        id: "3",
        name: "Creative Coders",
        description: "Команда креативных разработчиков, создающих инновационные решения с фокусом на пользовательский опыт.",
        membersCount: 2,
        maxMembers: 5,
        createdAt: "2024-01-20",
        status: "inactive",
        events: [],
        members: [
            {
                id: "8",
                name: "Ольга Иванова",
                email: "olga@example.com",
                role: "leader",
                joinedAt: "2024-01-20"
            },
            {
                id: "9",
                name: "Павел Смирнов",
                email: "pavel@example.com",
                role: "member",
                joinedAt: "2024-01-21"
            }
        ]
    }
] 