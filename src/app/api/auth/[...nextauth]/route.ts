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
            }
            
            // Fetch fresh role from DB
            if (token.email) {
                const dbUser = await prisma.user.findUnique({ where: { email: token.email }});
                if (dbUser) {
                    token.role = dbUser.role;
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
    jwt: {
        // Gracefully handle tokens signed with an old secret by returning null
        // instead of throwing JWEDecryptionFailed which causes a 500 error.
        async decode(params) {
            try {
                const { decode } = await import('next-auth/jwt');
                return await decode(params);
            } catch (e) {
                // Old/invalid token — treat as unauthenticated. 
                // Browser will get a fresh token on next login.
                return null;
            }
        }
    },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
