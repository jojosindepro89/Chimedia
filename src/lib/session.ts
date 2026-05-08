import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { decode } from 'next-auth/jwt';

export async function getSession() {
    try {
        const cookieStore = await cookies();
        const secureCookie = cookieStore.get("__Secure-next-auth.session-token");
        const hostCookie = cookieStore.get("__Host-next-auth.session-token");
        const standardCookie = cookieStore.get("next-auth.session-token");

        const tokenCookie = secureCookie || hostCookie || standardCookie;
        if (!tokenCookie?.value) return null;

        const salt = tokenCookie.name;

        const decoded = await decode({
            token: tokenCookie.value,
            secret: process.env.NEXTAUTH_SECRET || "fallback_secret_for_development_123",
            salt: salt
        });

        if (decoded) {
            return { user: decoded };
        }
    } catch (error) {
        console.error("Manual Session Decode Error:", error);
    }
    return null;
}

export async function verifySession() {
    const session = await getSession();
    if (!session) {
        redirect('/login?error=SessionExpired');
    }
    return session;
}

export async function verifyAdminSession() {
    const session = await getSession();
    
    if (!session) {
        redirect('/admin/login');
    }

    if ((session.user as any)?.role !== 'ADMIN') {
        redirect('/admin/login?error=Unauthorized');
    }

    return session;
}

// No-ops to satisfy existing code signatures without tearing them all out.
// NextAuth handles creating and destroying sessions automatically.
export async function createSession(user: any) { 
}

export async function deleteSession() { 
}
