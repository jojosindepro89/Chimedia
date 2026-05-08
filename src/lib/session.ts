import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { decode } from 'next-auth/jwt';

const SECRET = process.env.NEXTAUTH_SECRET || "fallback_secret_for_development_123";

export async function getSession() {
    try {
        const cookieStore = await cookies();

        // 1. Check custom admin_direct_session cookie (set by adminDirectLogin server action)
        const directCookie = cookieStore.get("admin_direct_session");
        if (directCookie?.value) {
            const decoded = await decode({
                token: directCookie.value,
                secret: SECRET,
                salt: "admin_direct_session",
            });
            if (decoded) return { user: decoded };
        }

        // 2. Fall back to standard NextAuth JWT cookies
        const tokenCookie =
            cookieStore.get("__Secure-next-auth.session-token") ||
            cookieStore.get("__Host-next-auth.session-token") ||
            cookieStore.get("next-auth.session-token");

        if (tokenCookie?.value) {
            const decoded = await decode({
                token: tokenCookie.value,
                secret: SECRET,
                salt: tokenCookie.name,
            });
            if (decoded) return { user: decoded };
        }
    } catch (error) {
        console.error("Session decode error:", error);
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
