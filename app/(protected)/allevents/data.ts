export interface Expert {
    name: string;
    title: string;
    imageUrl: string;
}

export interface ScheduleItem {
    time: string;
    topic: string;
    speaker?: string;
}

export interface Team {
    id: number;
    name: string;
    avatarUrl: string;
    membersCount: number;
}

export interface Stage {
    title: string;
    dateRange: string;
    description: string;
}

export interface Contact {
    name: string;
    role: string;
    email: string;
}

export interface Hackathon {
    id: number;
    title: string;
    date: string;
    description: string;
    detailedDescription?: string;
    theses?: string[];
    prizePool: string;
    location: string;
    participants: number;
    totalSpots?: number;
    registrationEndDate?: string;
    organizer?: string;
    experts?: Expert[];
    schedule?: ScheduleItem[];
    stages?: Stage[];
    teams?: Team[];
    contacts?: Contact[];
    status: "active" | "upcoming" | "completed";
    format: "online" | "offline" | "hybrid";
    image: string;
    type: "hackathon" | "contest" | "cybersport";
}

export const hackathons: Hackathon[] = [
    {
        id: 1,
        title: "Хакатон",
        date: "3 декабря 2025 в 08:00",
        registrationEndDate: "2025-11-20T23:59:59",
        description:
            "Хакатон — это особый формат соревнования, где участники решают поставленную перед ними задачу за ограниченный срок.",
        detailedDescription: "Приглашаем всех, кто увлечен технологиями, на наш ежегодный хакатон! Это соревнование, где за 48 часов вы сможете превратить свою смелую идею в работающий прототип. Мы собираем лучших разработчиков, дизайнеров, и продакт-менеджеров для решения реальных бизнес-задач от наших партнеров. \n\nВас ждут менторская поддержка от экспертов индустрии, лекции о передовых технологиях, а также море кофе и пиццы для поддержания бодрости духа. Независимо от того, есть у вас команда или вы ищете единомышленников, — это ваш шанс проявить себя, получить ценный опыт и побороться за крупный призовой фонд.",
        theses: [
            "Создание инновационных IT-решений для реального сектора экономики.",
            "Развитие профессиональных навыков и компетенций участников.",
            "Формирование новых команд и поддержка стартап-инициатив.",
            "Поиск и привлечение талантливых специалистов в компании-партнеры.",
            "Обмен опытом и знаниями внутри IT-сообщества."
        ],
        prizePool: "100 000",
        location: "Москва",
        participants: 150,
        totalSpots: 200,
        organizer: "Бизнес-школа Уральского федерального университета",
        experts: [
            { name: "Иван Жданов", title: "Эксперт по управлению изменениями PROSCI® ADKAR®", imageUrl: "/avatars/01.png" },
            { name: "Лариса Малышева", title: "Директор Бизнес-школы УрФУ, д.э.н., профессор", imageUrl: "/avatars/02.png" }
        ],
        schedule: [
            { time: "10:00 - 11:00", topic: "Регистрация и приветственный кофе" },
            { time: "11:00 - 13:00", topic: "Доклад: Человеческий фактор в операционной эффективности", speaker: "Иван Жданов" },
            { time: "13:00 - 14:00", topic: "Обед" },
            { time: "14:00 - 16:00", topic: "Практический кейс и работа в группах" },
            { time: "16:00 - 16:30", topic: "Подведение итогов и награждение" }
        ],
        stages: [
            { title: "Регистрация", dateRange: "1 Ноября - 20 Ноября", description: "Открыта регистрация для команд и индивидуальных участников." },
            { title: "Отборочный этап", dateRange: "21 Ноября - 30 Ноября", description: "Команды решают тестовые задания и кейсы онлайн." },
            { title: "Финал", dateRange: "3 Декабря", description: "Очный этап в Москве. Презентация проектов и определение победителей." }
        ],
        teams: [
            { id: 1, name: "Космические инженеры", avatarUrl: "/teams/team-1.png", membersCount: 4 },
            { id: 2, name: "Нейро-штурм", avatarUrl: "/teams/team-2.png", membersCount: 5 },
            { id: 3, name: "Data Dreamers", avatarUrl: "/teams/team-3.png", membersCount: 3 },
            { id: 4, name: "Код-брейкеры", avatarUrl: "/teams/team-4.png", membersCount: 4 }
        ],
        contacts: [
            { name: "Анна Смирнова", role: "Координатор мероприятия", email: "a.smirnova@urfu-bs.ru" },
            { name: "Техническая поддержка", role: "Помощь с платформой", email: "support@urfu-hack.ru" }
        ],
        status: "active",
        format: "hybrid",
        image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
        type: "hackathon",
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
        type: "hackathon"
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
        type: "hackathon"
    },
] 