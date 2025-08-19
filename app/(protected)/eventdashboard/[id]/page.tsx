'use client'
import EventTeamsPage from "../components/EventTeamsPage"
import { RoleGuard } from "@/components/role-guard"

export default function EventsPage() {
    return (
        // <RoleGuard>
            <EventTeamsPage />
        // </RoleGuard>
    )
} 