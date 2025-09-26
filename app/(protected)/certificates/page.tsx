'use client'

import { useMemo, useState } from 'react'
import Certificates from '@/app/(protected)/certificates/components/Certificates'
import { certificates } from './data'
import { SearchBar } from './components/SearchBar'
import { RoleGuard } from "@/components/role-guard"
import { Button } from "@/components/ui/button"

const TABS = [
    { id: 'all', label: 'Все' },
    { id: 'participation', label: 'Участие' },
    { id: 'completion', label: 'Курс' },
    { id: 'achievement', label: 'Достижения' },
]

export default function CertificatesPage() {
    const [searchQuery, setSearchQuery] = useState('')
    const [activeType, setActiveType] = useState<string>('all')

    const filteredCertificates = useMemo(() => {
        return certificates.filter(cert => {
            const matchesType = activeType === 'all' || cert.type === activeType
            const query = searchQuery.toLowerCase()
            const matchesQuery = cert.title.toLowerCase().includes(query) || cert.description.toLowerCase().includes(query)
            return matchesType && matchesQuery
        })
    }, [searchQuery, activeType])

    return (
        <RoleGuard>
            <div className="min-h-screen bg-background p-4 sm:p-6">
                <div className="max-w-[1200px] mx-auto flex flex-col gap-8">
                    <div className="flex flex-col gap-4">
                        <h1 className="text-3xl font-extrabold">Сертификаты</h1>
                        <div className="flex flex-col md:flex-row md:items-center gap-3 md:justify-between">
                            <div className="flex flex-wrap gap-2">
                                {TABS.map(tab => (
                                    <Button
                                        key={tab.id}
                                        variant={activeType === tab.id ? 'default' : 'outline'}
                                        size="sm"
                                        onClick={() => setActiveType(tab.id)}
                                    >
                                        {tab.label}
                                    </Button>
                                ))}
                            </div>
                            <div className="w-full md:w-[360px]">
                                <SearchBar
                                    searchQuery={searchQuery}
                                    onSearchChange={setSearchQuery}
                                />
                            </div>
                        </div>
                    </div>

                    <Certificates certificates={filteredCertificates} />
                </div>
            </div>
        </RoleGuard>
    )
}