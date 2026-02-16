import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { decrypt } from '@/lib/auth'

export async function middleware(request: NextRequest) {
    // 1. Helper to redirect
    const redirectToLogin = () => {
        const url = request.nextUrl.clone()
        url.pathname = '/admin/login'
        url.search = `?callbackUrl=${encodeURIComponent(request.nextUrl.pathname)}`
        return NextResponse.redirect(url)
    }

    // 2. Protect /admin routes
    if (request.nextUrl.pathname.startsWith('/admin')) {
        // Exclude login page and setup page (if needed, but setup should be protected too eventually)
        // Allowing setup page ONLY if no admins exist is better handled in the page itself or via a specific check.
        // For now, let's exclude login.
        if (request.nextUrl.pathname === ('/admin/login') || request.nextUrl.pathname.startsWith('/admin/setup')) {
            return NextResponse.next()
        }

        const cookie = request.cookies.get('session')?.value
        if (!cookie) {
            return redirectToLogin()
        }

        const session = await decrypt(cookie)

        // Check if session is valid and user is admin
        if (!session?.user || session.user.role !== 'ADMIN') {
            return redirectToLogin()
        }
    }

    return NextResponse.next()
}

export const config = {
    matcher: ['/admin/:path*'],
}
