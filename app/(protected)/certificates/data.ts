export interface Certificate {
    id: number
    title: string
    description: string
    date: string
    type: string
}

export const certificates: Certificate[] = [
    {
        id: 1,
        title: "Сертификат участника хакатона",
        description: "Выдан за успешное участие в хакатоне по разработке инновационных IT-решений. Продемонстрированы навыки командной работы, программирования и решения сложных технических задач.",
        date: "Декабрь 05, 2023",
        type: "participation"
    },
    {
        id: 2,
        title: "Сертификат о прохождении курса Web-разработки",
        description: "Подтверждает успешное освоение курса по веб-разработке, включая HTML, CSS и JavaScript.",
        date: "Январь 15, 2024",
        type: "completion"
    },
    {
        id: 3,
        title: "Сертификат достижений в области программирования",
        description: "За выдающиеся достижения в области программирования и разработки программного обеспечения.",
        date: "Февраль 20, 2024",
        type: "achievement"
    }
]; 