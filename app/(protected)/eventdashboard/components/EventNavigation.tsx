"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Home, Users, Calendar, Trophy, BarChart3, FileText, Bell, Settings } from "lucide-react"

const navigationItems = [
  {
    id: "overview",
    title: "Обзор",
    icon: Home,
    href: "/event/overview",
  },
  {
    id: "teams",
    title: "Команды",
    icon: Users,
    href: "/event/teams",
    badge: "6", // количество ожидающих
    isActive: true,
  },
  {
    id: "schedule",
    title: "Расписание",
    icon: Calendar,
    href: "/event/schedule",
  },
  {
    id: "results",
    title: "Результаты",
    icon: Trophy,
    href: "/event/results",
  },
  {
    id: "analytics",
    title: "Аналитика",
    icon: BarChart3,
    href: "/event/analytics",
  },
  {
    id: "reports",
    title: "Отчеты",
    icon: FileText,
    href: "/event/reports",
  },
  {
    id: "notifications",
    title: "Уведомления",
    icon: Bell,
    href: "/event/notifications",
    badge: "3",
  },
  {
    id: "settings",
    title: "Настройки",
    icon: Settings,
    href: "/event/settings",
  },
]

export function EventNavigation() {
  const [activeTab, setActiveTab] = useState("teams")

  return (
    <div className="border-b border-border bg-background transition-colors duration-200">
      <div className="px-2 md:px-8">
        <div className="flex items-center gap-4 overflow-x-auto py-2">
          {navigationItems.map((item) => {
            const Icon = item.icon
            const isActive = item.isActive || activeTab === item.id

            return (
              <Button
                key={item.id}
                variant={isActive ? "default" : "ghost"}
                size="lg"
                className={
                  `flex items-center gap-3 whitespace-nowrap text-lg font-semibold px-6 py-3 rounded-xl transition-colors duration-200` +
                  (isActive ? "" : " text-foreground/80 hover:text-primary")
                }
                onClick={() => setActiveTab(item.id)}
              >
                <Icon className="w-6 h-6" />
                <span className="flex items-center justify-center">{item.title}</span>
                {item.badge && (
                  <Badge variant={isActive ? "secondary" : "outline"} className="text-base px-2 py-0.5 flex items-center justify-center">
                    {item.badge}
                  </Badge>
                )}
              </Button>
            )
          })}
        </div>
      </div>
    </div>
  )
}