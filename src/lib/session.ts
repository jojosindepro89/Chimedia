import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth-options";
import { redirect } from 'next/navigation';

export async function getSession() {
    return await getServerSession(authOptions);
}

export async function verifySession() {
    const session = await getServerSession(authOptions);
    if (!session) {
        redirect('/login?error=SessionExpired');
    }
    return session;
}

export async function verifyAdminSession() {
    const session = await getServerSession(authOptions);

    if (!session) {
        redirect('/admin/login');
    }

    if ((session.user as any)?.role !== 'ADMIN') {
        redirect('/admin/login?error=Unauthorized');
    }

    return session;
}

// No-ops to satisfy existing code signatures.
export async function createSession(user: any) {}
export async function deleteSession() {}
