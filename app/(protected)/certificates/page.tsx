'use client'
import { Input } from "@/components/ui/input"
import Certificates from '@/components/Certificates'
import { useState } from 'react'

interface Certificate {
    id: number
    title: string
    description: string
    date: string
    type: string
}

const certificates: Certificate[] = [
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
]

export default function CertificatesPage() {
    const [searchQuery, setSearchQuery] = useState('')

    const filteredCertificates = certificates.filter(cert =>
        cert.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cert.description.toLowerCase().includes(searchQuery.toLowerCase())
    )

    return (
        <div className="min-h-screen bg-background p-8">
            <div className="flex flex-col gap-8">
                <div className="flex flex-col gap-6">
                    <h1 className="text-2xl font-bold">Сертификаты</h1>
                    <div className="flex flex-col sm:flex-row gap-4">
                        <Input
                            className="w-full sm:w-[300px] bg-background"
                            placeholder="Поиск..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>

                <Certificates certificates={filteredCertificates} />
            </div>
        </div>
    )
} 