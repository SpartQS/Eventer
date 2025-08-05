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
  PlusCircle,
  ClipboardList,
  Users
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
  SidebarTrigger
} from "@/components/ui/sidebar"
import { ROLES } from "@/app/config/roles"
import { useUserRole } from "@/hooks/useUserRole"
import { useSession } from "next-auth/react"

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
      name: "Дашборд",
      url: "/eventdashboard/1",
      icon: ClipboardList,
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
      name: "Команды",
      url: "/teams",
      icon: Users,
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
  const { userRole, isRoleLoaded, status, isAdmin, isUser, isOrganizer } = useUserRole();
  const { status: authStatus } = useSession();

  // Показываем индикатор загрузки пока роль не определена
  if (!isRoleLoaded || status === "loading") {
    return (
      <Sidebar variant="inset" collapsible="icon" className="transition-all duration-200 ease-linear" {...props}>
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton size="lg" disabled>
                <div className="flex items-center justify-center rounded-full bg-gray-200 font-bold text-xl mx-auto my-2 w-10 h-10 min-w-[40px] min-h-[40px] group-data-[state=collapsed]/sidebar:w-6 group-data-[state=collapsed]/sidebar:h-6 group-data-[state=collapsed]/sidebar:min-w-[24px] group-data-[state=collapsed]/sidebar:min-h-[24px] group-data-[state=collapsed]/sidebar:text-base overflow-visible">
                  U
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">Eventer</span>
                  <span className="truncate text-xs">Загрузка...</span>
                </div>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
        <SidebarContent>
          <div className="flex items-center justify-center p-4">
            <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent"></div>
          </div>
        </SidebarContent>
      </Sidebar>
    )
  }

  // Фильтруем проекты на основе роли пользователя
  let filteredProjects = data.projects;

  if (isUser) {
    filteredProjects = data.projects.filter(
      (item) =>
        item.url !== "/eventdashboard/1" &&
        item.url !== "/createevent" &&
        item.url !== "/teams"
    );
  } else if (isOrganizer) {
    filteredProjects = data.projects.filter(
      (item) =>
        item.url === "/profile" ||
        item.url === "/dashboard" ||
        item.url === "/createevent"
    );
  } else if (isAdmin) {
    // Админ видит все пункты меню
    filteredProjects = data.projects;
  }

  return (
    <Sidebar variant="inset" collapsible="icon" className="transition-all duration-200 ease-linear" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/">
                <div className="flex items-center justify-center rounded-full bg-gray-200 font-bold text-xl mx-auto my-2 w-10 h-10 min-w-[40px] min-h-[40px] group-data-[state=collapsed]/sidebar:w-6 group-data-[state=collapsed]/sidebar:h-6 group-data-[state=collapsed]/sidebar:min-w-[24px] group-data-[state=collapsed]/sidebar:min-h-[24px] group-data-[state=collapsed]/sidebar:text-base overflow-visible">
                  U
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">Eventer</span>
                  <span className="truncate text-xs">Eventer</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavProjects projects={filteredProjects} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      {authStatus === "authenticated" && (
        <SidebarFooter>
          <NavUser />
        </SidebarFooter>
      )}
    </Sidebar>
  )
}
