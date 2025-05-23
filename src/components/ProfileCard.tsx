import type React from "react"
import { Mail, Edit2, Gamepad2, Laptop, Cpu } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

interface ProfileStat {
    icon: React.ReactNode
    label: string
    value: number
}

interface ProfileInfo {
    label: string
    value: string
}

export function ProfileCard() {
    const stats: ProfileStat[] = [
        {
            icon: <Laptop className="size-5" />,
            label: "Хакатон",
            value: 15,
        },
        {
            icon: <Gamepad2 className="size-5" />,
            label: "Киберспорт",
            value: 4,
        },
        {
            icon: <Cpu className="size-5" />,
            label: "Алгоритмы",
            value: 8,
        },
    ]

    const info: ProfileInfo[] = [
        { label: "Статус", value: "Участник" },
        { label: "Пол", value: "мужской" },
        { label: "Город", value: "Бахчисарай" },
        { label: "Возраст", value: "25" },
    ]

    return (
        <Card className="w-full max-w-md bg-white text-gray-900 border-gray-200 shadow-sm">
            <CardHeader className="flex flex-row items-start gap-4 p-6">
                <Avatar className="h-24 w-24 rounded-full border-2 border-gray-200">
                    <AvatarImage
                        src="https://github.com/shadcn.png"
                        alt="Profile picture"
                    />
                    <AvatarFallback className="bg-gray-100 text-gray-700">ЕО</AvatarFallback>
                </Avatar>
                <div className="flex flex-col flex-1">
                    <div className="flex justify-between items-start">
                        <div>
                            <h2 className="text-2xl font-bold">Евгений Онегин</h2>
                            <div className="flex items-center text-gray-500 mt-1">
                                <Mail className="h-4 w-4 mr-1" />
                                <span className="text-sm">evgeniy@gmail.com</span>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <Edit2 className="h-5 w-5 text-gray-500" />
                            <Badge variant="outline" className="text-xs font-normal border-gray-300">
                                UntiID:U1234567
                            </Badge>
                        </div>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="p-0">
                <div className="px-6 py-4">
                    <h3 className="text-lg font-medium mb-4">Участвовал</h3>
                    <div className="flex justify-between">
                        {stats.map((stat, index) => (
                            <div key={index} className="flex flex-col items-center">
                                <div className="p-3 rounded-md bg-gray-100 mb-2">{stat.icon}</div>
                                <span className="text-sm text-gray-500">{stat.label}</span>
                                <span className="font-bold">{stat.value}</span>
                            </div>
                        ))}
                    </div>
                </div>
                <Separator className="bg-gray-200 my-4" />
                <div className="px-6 pb-6">
                    <h3 className="text-lg font-medium mb-4">Информация</h3>
                    <div className="space-y-2">
                        {info.map((item, index) => (
                            <div key={index} className="flex">
                                <span className="text-gray-500 w-24">{item.label} :</span>
                                <span className="ml-2">{item.value}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </CardContent>
        </Card>
    )
} 