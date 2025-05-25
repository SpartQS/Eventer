import { ProfileCard } from "@/components/ProfileCard"
import { Notifications } from "@/components/Notifications"
import { CurrentEvents } from "@/components/CurrentEvents"
import { ProfileCalendar } from "@/components/ProfileCalendar"

export function ProfilePage() {
    return (
        <div className="flex gap-6 p-6 max-w-[1400px] mx-auto">
            <ProfileCard />
            <div className="flex-1 min-w-0">
                <div className="h-full flex flex-col gap-6">
                    <div className="flex gap-6">
                        <Notifications />
                        <ProfileCalendar />
                    </div>
                    <CurrentEvents />
                </div>
            </div>
        </div>
    )
}