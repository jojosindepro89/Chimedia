import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { decode } from 'next-auth/jwt';

export async function getSession() {
    try {
        const cookieStore = await cookies();
        const tokenCookie = cookieStore.get("__Secure-next-auth.session-token") || cookieStore.get("next-auth.session-token");
        
        if (!tokenCookie?.value) return null;
        
        const decoded = await decode({
            token: tokenCookie.value,
            secret: process.env.NEXTAUTH_SECRET || "fallback_secret_for_development_123"
        });
        
        if (decoded) {
            return { user: decoded };
        }
    } catch (e) {
        console.error("Session decode error:", e);
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
