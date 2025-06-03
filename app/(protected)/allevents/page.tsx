'use client'
import HackathonBoard from "@/app/(protected)/allevents/components/hackathon-board"
import { RoleGuard } from "@/components/role-guard"

export default function EventsPage() {
    return (
        <RoleGuard>
            <HackathonBoard />
        </RoleGuard>
    )
} 