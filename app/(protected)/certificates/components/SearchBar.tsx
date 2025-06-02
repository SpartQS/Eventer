'use client'

import { Input } from "@/components/ui/input"

interface SearchBarProps {
    searchQuery: string
    onSearchChange: (value: string) => void
}

export function SearchBar({ searchQuery, onSearchChange }: SearchBarProps) {
    return (
        <div className="flex flex-col sm:flex-row gap-4">
            <Input
                className="w-full sm:w-[300px] bg-background"
                placeholder="Поиск..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
            />
        </div>
    )
} 