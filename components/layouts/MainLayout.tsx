'use client';

import { AppSidebar } from "@/components/app-sidebar"
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { ThemeToggle } from "@/components/theme-toggle"
import { AuthGuard } from "@/components/auth-guard"

export default function MainLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <AuthGuard>
            <SidebarProvider>
                <AppSidebar />
                <SidebarInset>
                    <header className="sticky top-0 z-50 flex h-16 shrink-0 items-center gap-2 border-b bg-background">
                        <div className="flex items-center gap-2 px-4">
                            <SidebarTrigger className="-ml-1" />
                            <Separator orientation="vertical" className="mr-2 h-4" />
                        </div>
                        <div className="ml-auto flex items-center gap-2 px-4">
                            <ThemeToggle />
                        </div>
                    </header>
                    <main className="flex-1 transition-all duration-200 ease-linear">
                        {children}
                    </main>
                </SidebarInset>
            </SidebarProvider>
        </AuthGuard>
    )
} 