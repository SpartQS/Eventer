import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
    function middleware(req) {
        return NextResponse.next()
    },
    {
        callbacks: {
            authorized: ({ token }) => !!token,
        },

        pages: {
            signIn: "/",
            // error: "/error",
          },
    }
)

export const config = {
    matcher: [
        // "/((?!^allevents$|^eventdetails/\\d+$).*)"
        // "/((?!allevents|eventdetails).*)"
        "/((?!allevents$|eventdetails/\\d+$|^api|^_next|.*\\..*$).*)"
        // "/allevents"
        // "/profile/:path*",
        // "/allavents/:path*",
        // "/dashboard/:path*",
        // "/events/:path*",
        // "/my-events/:path*",
        // "/create-event/:path*",
        // "/certificates/:path*"
    ]
} 