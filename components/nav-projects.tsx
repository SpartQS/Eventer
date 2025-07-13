"use client"

import Link from "next/link"
import { MoreHorizontal, type LucideIcon } from "lucide-react"
import { usePathname } from "next/navigation"

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"

export function NavProjects({
  projects,
}: {
  projects: {
    name: string
    url: string
    icon: LucideIcon
  }[]
}) {
  const { isMobile, setOpenMobile, state } = useSidebar()
  const pathname = usePathname()

  return (
    <SidebarGroup>
      <SidebarGroupLabel className="text-lg font-medium">Основное</SidebarGroupLabel>
      <SidebarMenu>
        {projects.map((item) => (
          <SidebarMenuItem key={item.name}>
            <SidebarMenuButton
              asChild
              size="lg"
              isActive={pathname.startsWith(item.url)}
              className={state === "collapsed" ? "justify-center px-0" : ""}
            >
              <Link
                href={item.url}
                onClick={() => {
                  if (isMobile) setOpenMobile(false)
                }}
              >
                <item.icon />
                {state === "expanded" && <span className="text-base">{item.name}</span>}
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
        <SidebarMenuItem>
          <SidebarMenuButton size="lg" className={state === "collapsed" ? "justify-center px-0" : ""}>
            <MoreHorizontal />
            {state === "expanded" && <span className="text-base">Больше</span>}
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarGroup>
  )
}
