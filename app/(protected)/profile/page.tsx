'use client';

import { ProfileCard } from "@/app/(protected)/profile/components/ProfileCard"
import { Notifications } from "@/app/(protected)/profile/components/Notifications"
import { CurrentEvents } from "@/app/(protected)/profile/components/CurrentEvents"
import { ProfileTimer } from "@/app/(protected)/profile/components/ProfileTimer"

export default function ProfilePage() {
    return (
        <div className="flex gap-6 p-6 max-w-[1400px] mx-auto">
            <ProfileCard />
            <div className="flex-1 min-w-0">
                <div className="h-full flex flex-col gap-6">
                    <div className="flex gap-6">
                        <Notifications />
                        <ProfileTimer />
                    </div>
                    <CurrentEvents />
                </div>
            </div>
        </div>
    )
}
