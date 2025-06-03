'use client'

import CalendarStrip from './components/CalendarStrip'
import { RoleGuard } from "@/components/role-guard"

export default function DashboardPage() {
    return (
        <RoleGuard>
            <div className="min-h-screen bg-background p-8">
                <div className="max-w-[1400px] mx-auto flex flex-col gap-8">
                    <div className="flex flex-col gap-6">
                        <h1 className="text-2xl font-bold">Дашборд</h1>
                    </div>
                    <CalendarStrip />
                </div>
            </div>
        </RoleGuard>
    )
} 