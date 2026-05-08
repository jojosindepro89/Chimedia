'use server'

import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'
import { encode } from 'next-auth/jwt'
import { cookies } from 'next/headers'

export async function adminDirectLogin(formData: FormData): Promise<{ error: string } | { success: true }> {
    const email = formData.get('username') as string
    const password = formData.get('password') as string

    if (!email || !password) {
        return { error: 'Username and password are required.' }
    }

    const user = await prisma.user.findFirst({
        where: { OR: [{ email }, { name: email }] }
    })

    if (!user || !user.password) {
        return { error: 'Invalid credentials. Access denied.' }
    }

    const isValid = await bcrypt.compare(password, user.password)
    if (!isValid) {
        return { error: 'Invalid credentials. Access denied.' }
    }

    if ((user as any).role !== 'ADMIN') {
        return { error: 'You do not have admin access.' }
    }

    const secret = process.env.NEXTAUTH_SECRET || 'fallback_secret_for_development_123'

    const token = await encode({
        token: { id: user.id, email: user.email, name: user.name, role: (user as any).role },
        secret,
        salt: 'admin_direct_session'
    })

    const cookieStore = await cookies()

    // Clear any stale NextAuth or previous session cookies that may conflict
    const staleCookies = [
        '__Secure-next-auth.session-token',
        '__Host-next-auth.session-token',
        'next-auth.session-token',
        'next-auth.callback-url',
        '__Secure-next-auth.callback-url',
        'next-auth.csrf-token',
        '__Host-next-auth.csrf-token',
    ]
    for (const name of staleCookies) {
        cookieStore.delete(name)
    }

    // Set the new admin session cookie
    cookieStore.set('admin_direct_session', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 60 * 60 * 24 // 24 hours
    })

    return { success: true }
}
