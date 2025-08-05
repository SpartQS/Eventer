'use client';

import { useRouter, usePathname } from "next/navigation"
import { useEffect } from "react"
import { ROLE_ACCESS } from "@/app/config/roles"
import { useUserRole } from "@/hooks/useUserRole"

interface RoleGuardProps {
    children: React.ReactNode;
}

export function RoleGuard({ children }: RoleGuardProps) {
    const { userRole, isRoleLoaded, status, isAdmin, isUser, isOrganizer } = useUserRole()
    const router = useRouter()
    const pathname = usePathname()

    useEffect(() => {
        if (isRoleLoaded && status === "authenticated" && userRole) {
            console.log('=== RoleGuard Debug ===');
            console.log('Current role:', userRole);
            console.log('Current path:', pathname);
            console.log('Available roles:', Object.keys(ROLE_ACCESS));
            console.log('ROLE_ACCESS:', ROLE_ACCESS);

            const userRoleKey = userRole.toUpperCase() as keyof typeof ROLE_ACCESS;
            const allowedPaths = ROLE_ACCESS[userRoleKey] || [];

            console.log('User role (after transform):', userRoleKey);
            console.log('Allowed paths for role:', allowedPaths);
            console.log('Path check:', allowedPaths.map(path => ({
                path,
                matches: pathname.startsWith(path)
            })));

            if (!allowedPaths.some(path => pathname.startsWith(path))) {
                console.log('Access denied, redirecting...');
                router.push("/profile")
            }
        }
    }, [isRoleLoaded, status, userRole, router, pathname])

    if (status === "loading" || !isRoleLoaded) {
        return (
            <div className="flex h-screen w-full items-center justify-center">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
            </div>
        )
    }

    if (status === "authenticated" && userRole) {
        const userRoleKey = userRole.toUpperCase() as keyof typeof ROLE_ACCESS;
        const allowedPaths = ROLE_ACCESS[userRoleKey] || [];

        if (allowedPaths.some(path => pathname.startsWith(path))) {
            return <>{children}</>
        }
    }

    return null
} 