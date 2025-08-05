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
import { useSession } from "next-auth/react"
import { ROLES } from "@/app/config/roles"

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
    // {
    //   name: "Команды",
    //   url: "/teams",
    //   icon: Users,
    // },
    // {
    //   name: "Создать мероприятие",
    //   url: "/createevent",
    //   icon: PlusCircle,
    // },
    {
      name: "Сертификаты",
      url: "/certificates",
      icon: File,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data: session } = useSession();
  let filteredProjects = data.projects;
  if (session?.role && session.role.toUpperCase() === ROLES.USER) {
    filteredProjects = data.projects.filter(
      (item) => item.url !== "/eventdashboard/1" 
    );
  } 
  // else if (session?.role && session.role.toUpperCase() === ROLES.ORGANAIZER) {
  //   filteredProjects = data.projects.filter(
  //     (item) =>
  //       item.url !== "/myevents" &&
  //       item.url !== "/allevents" &&
  //       item.url !== "/certificates"
  //   );
  // }
  return (
    // <Sidebar variant="inset" collapsible="icon" className="transition-all duration-200 ease-linear" {...props}>
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
        {/* Удалена дублирующая кнопка SidebarTrigger */}
      </SidebarHeader>
      <SidebarContent>
        <NavProjects projects={filteredProjects} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  )
}
