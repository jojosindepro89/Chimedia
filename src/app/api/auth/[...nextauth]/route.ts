import NextAuth from "next-auth";
import { authOptions } from "@/lib/auth-options";
import { NextRequest } from "next/server";

const handler = async (req: NextRequest, ctx: any) => {
    const protocol = req.headers.get("x-forwarded-proto") || "https";
    const host = req.headers.get("host");
    if (host) {
        process.env.NEXTAUTH_URL = `${protocol}://${host}`;
    }
    
    const authHandler = NextAuth(authOptions);
    return await authHandler(req, ctx);
};

export { handler as GET, handler as POST };
