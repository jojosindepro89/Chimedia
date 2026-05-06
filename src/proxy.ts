import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'

export async function proxy(request: NextRequest) {
    // Protect /admin routes
    if (request.nextUrl.pathname.startsWith('/admin')) {
        // Exclude login page and setup page
        if (request.nextUrl.pathname === '/admin/login' || request.nextUrl.pathname.startsWith('/admin/setup')) {
            return NextResponse.next()
        }

        const token = await getToken({ 
            req: request, 
            secret: process.env.NEXTAUTH_SECRET 
        })
        
        // Check if session is valid and user is admin
        if (!token || token.role !== 'ADMIN') {
            const url = request.nextUrl.clone()
            url.pathname = '/admin/login'
            url.search = `?callbackUrl=${encodeURIComponent(request.nextUrl.pathname)}`
            return NextResponse.redirect(url)
        }
    }

    return NextResponse.next()
}

export const config = {
    matcher: ['/admin/:path*'],
}
