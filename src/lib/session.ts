import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
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
    
    if (!session || (session.user as any)?.role !== 'ADMIN') {
        return null; // Return null instead of throwing redirect()
    }

    return session;
}

// No-ops to satisfy existing code signatures without tearing them all out.
// NextAuth handles creating and destroying sessions automatically.
export async function createSession(user: any) { 
}

export async function deleteSession() { 
}
