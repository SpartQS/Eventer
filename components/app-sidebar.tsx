"use client"

import Image from "next/image"
import Link from "next/link"
import {
  GalleryVerticalEnd,
  LifeBuoy,
  File,
  GraduationCap,
  Send,
  UserRound,
  PlusCircle
} from "lucide-react"

import { NavProjects } from "@/components/nav-projects"
import { NavSecondary } from "@/components/nav-secondary"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

const data = {
  navSecondary: [
    {
      title: "Поддержка",
      url: "#",
      icon: LifeBuoy,
    },
    {
      title: "Обратная связь",
      url: "#",
      icon: Send,
    },
  ],
  projects: [
    {
      name: "Профиль",
      url: "/profile",
      icon: UserRound,
    },
    {
      name: "Все мероприятия",
      url: "/allevents",
      icon: GalleryVerticalEnd,
    },
    {
      name: "Мои мероприятия",
      url: "/myevents",
      icon: GraduationCap,
    },
    {
      name: "Создать мероприятие",
      url: "/createevent",
      icon: PlusCircle,
    },
    {
      name: "Сертификаты",
      url: "/certificates",
      icon: File,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar variant="inset" className="transition-all duration-200 ease-linear" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg text-sidebar-primary-foreground overflow-hidden">
                  <Image
                    src="/logo.png"
                    alt="Logo"
                    width={32}
                    height={32}
                    className="size-full object-cover"
                  />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">Eventer</span>
                  <span className="truncate text-xs">КИПУ</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavProjects projects={data.projects} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  )
}
