import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: { label: "Username / Email", type: "text" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                if (!credentials?.username || !credentials?.password) return null;

                const user = await prisma.user.findFirst({
                    where: {
                        OR: [
                            { email: credentials.username },
                            { name: credentials.username }
                        ]
                    }
                });

                if (!user || !user.password) return null;

                const isValid = await bcrypt.compare(credentials.password, user.password);
                if (!isValid) return null;

                return user;
            }
        })
    ],
    session: {
        strategy: "jwt",
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                // Store role in JWT at login time so we don't need a DB call on every request
                token.role = (user as any).role || 'USER';
            }
            
            // Refresh role from DB on subsequent requests — with fault tolerance
            // This allows role changes to take effect without re-login
            if (!user && token.email) {
                try {
                    const dbUser = await prisma.user.findUnique({ where: { email: token.email }});
                    if (dbUser) {
                        token.role = dbUser.role;
                    }
                } catch (e) {
                    console.error('[NextAuth] Failed to fetch user role from DB:', e);
                    // Keep whatever role is already in the token
                }
            }
            return token;
        },
        async session({ session, token }) {
            if (session.user) {
                (session.user as any).id = token.id;
                (session.user as any).role = token.role || "USER";
            }
            return session;
        }
    },
    pages: {
        signIn: '/login',
    },
    secret: process.env.NEXTAUTH_SECRET,
    // Custom decode removed to prevent hanging during authentication
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
