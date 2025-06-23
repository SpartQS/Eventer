import { ProfileCard } from "@/app/(protected)/profile/components/ProfileCard"
import { Notifications } from "@/app/(protected)/profile/components/Notifications"
import { CurrentEvents } from "@/app/(protected)/profile/components/CurrentEvents"
import { ProfileTimer } from "@/app/(protected)/profile/components/ProfileTimer"
import { Metadata } from 'next';
import { RoleGuard } from "@/components/role-guard"

export const metadata: Metadata = {
    title: 'Профиль пользователя',
    description: 'Просмотр и управление профилем пользователя',
};

export default function ProfilePage() {
    return (
        <RoleGuard>
            <div className="flex flex-col lg:flex-row gap-6 p-4 sm:p-6 max-w-[1400px] mx-auto">
                <ProfileCard />
                <div className="flex-1 min-w-0">
                    <div className="h-full flex flex-col gap-6">
                        <div className="flex flex-col md:flex-row gap-6">
                            <Notifications />
                            <ProfileTimer />
                        </div>
                        <CurrentEvents />
                    </div>
                </div>
            </div>
        </RoleGuard>
    )
}
