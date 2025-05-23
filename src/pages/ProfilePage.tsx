import { ProfileCard } from "@/components/ProfileCard"
import { NotificationsEvents } from "@/components/NotificationsEvents"

export function ProfilePage() {
    return (
        <div className="flex gap-6 p-6">
            <ProfileCard />
            <div className="flex-1">
                <div className="h-full">
                    <NotificationsEvents />
                </div>
            </div>
        </div>
    )
}