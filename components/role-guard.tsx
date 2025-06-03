'use client';

import { useSession } from "next-auth/react"
import { useRouter, usePathname } from "next/navigation"
import { useEffect } from "react"
import { ROLE_ACCESS, ROLES } from "@/app/config/roles"

interface RoleGuardProps {
    children: React.ReactNode;
}

export function RoleGuard({ children }: RoleGuardProps) {
    const { data: session, status } = useSession()
    const router = useRouter()
    const pathname = usePathname()

    useEffect(() => {
        if (status === "authenticated" && session?.role) {
            console.log('=== RoleGuard Debug ===');
            console.log('Session:', session);
            console.log('Current role:', session.role);
            console.log('Current path:', pathname);
            console.log('Available roles:', Object.keys(ROLE_ACCESS));
            console.log('ROLE_ACCESS:', ROLE_ACCESS);
            
            const userRole = session.role.toUpperCase() as keyof typeof ROLE_ACCESS;
            const allowedPaths = ROLE_ACCESS[userRole] || [];
            
            console.log('User role (after transform):', userRole);
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
    }, [status, session, router, pathname])

    if (status === "loading") {
        return (
            <div className="flex h-screen w-full items-center justify-center">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
            </div>
        )
    }

    if (status === "authenticated" && session?.role) {
        const userRole = session.role.toUpperCase() as keyof typeof ROLE_ACCESS;
        const allowedPaths = ROLE_ACCESS[userRole] || [];
        
        if (allowedPaths.some(path => pathname.startsWith(path))) {
            return <>{children}</>
        }
    }

    return null
} 