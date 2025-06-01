import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
    function middleware(req) {
        return NextResponse.next()
    },
    {
        callbacks: {
            authorized: ({ token }) => !!token
        },
    }
)

export const config = {
    matcher: [
        "/profile/:path*",
        "/dashboard/:path*",
        "/events/:path*",
        "/my-events/:path*",
        "/create-event/:path*",
        "/certificates/:path*"
    ]
} 