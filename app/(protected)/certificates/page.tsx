'use client'

import { useState } from 'react'
import Certificates from '@/components/Certificates'
import { certificates } from './data'
import { SearchBar } from './components/SearchBar'

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
                    <SearchBar
                        searchQuery={searchQuery}
                        onSearchChange={setSearchQuery}
                    />
                </div>

                <Certificates certificates={filteredCertificates} />
            </div>
        </div>
    )
} 