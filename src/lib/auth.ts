import { SignJWT, jwtVerify } from 'jose'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

const secretKey = process.env.SESSION_SECRET || 'default-secret-key-change-me'
const key = new TextEncoder().encode(secretKey)

export async function encrypt(payload: any) {
    return await new SignJWT(payload)
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime('24h') // Session expires in 24 hours
        .sign(key)
}

export async function decrypt(input: string): Promise<any> {
    try {
        const { payload } = await jwtVerify(input, key, {
            algorithms: ['HS256'],
        })
        return payload
    } catch (error) {
        return null
    }
}

export async function createSession(user: { name: string; email: string; role: string }) {
    const expires = new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 hours
    const session = await encrypt({ user, expires })

        // Save the session in a cookie
        ; (await cookies()).set('session', session, { expires, httpOnly: true, sameSite: 'lax', path: '/' })
}

export async function getSession() {
    const session = (await cookies()).get('session')?.value
    if (!session) return null
    return await decrypt(session)
}

export async function verifySession() {
    const session = (await cookies()).get('session')?.value
    const payload = await decrypt(session || '')

    if (!session || !payload) {
        redirect('/login?error=SessionExpired')
    }

    return payload
}

export async function verifyAdminSession() {
    const session = (await cookies()).get('session')?.value
    const payload = await decrypt(session || '')

    if (!session || !payload) {
        redirect('/admin/login')
    }

    if (payload.user?.role !== 'ADMIN') {
        redirect('/admin/login?error=Unauthorized')
    }

    return payload
}

export async function deleteSession() {
    (await cookies()).delete('session')
}
