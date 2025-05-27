import * as React from "react"
import logo from '../assets/logo.png';
import {
  GalleryVerticalEnd,
  LifeBuoy,
  File,
  GraduationCap,
  Send,
  UserRound,
  PlusCircle
} from "lucide-react"
import { Link } from "react-router-dom";

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
  user: {
    name: "Евгений Онегин",
    email: "ID:1234567",
    avatar: "/avatars/shadcn.jpg",
  },

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
      url: "/events",
      icon: GalleryVerticalEnd,
    },
    {
      name: "Мои мероприятия",
      url: "/my-events",
      icon: GraduationCap,
    },
    {
      name: "Создать мероприятие",
      url: "/create-event",
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
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link to="/">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg text-sidebar-primary-foreground overflow-hidden">
                  <img src={logo} alt="Logo" className="size-full object-cover" />
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
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  )
}
