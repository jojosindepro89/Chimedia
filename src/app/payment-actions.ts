'use server'

import { redirect } from "next/navigation";
import { initializePayment } from "@/lib/paystack";
import { prisma } from "@/lib/prisma";
import { hash } from "bcryptjs";
import { createSession, getSession } from "@/lib/session";

function getBaseUrl() {
    if (process.env.NEXT_PUBLIC_APP_URL) return process.env.NEXT_PUBLIC_APP_URL;
    if (process.env.VERCEL_PROJECT_PRODUCTION_URL) return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
    if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
    return process.env.NEXTAUTH_URL || 'http://localhost:3000';
}

export async function initiateCheckout(amount: number, items: any[]) {
    console.log("🚀 initiateCheckout called with amount:", amount);

    const session = await getSession();
    const email = session?.user?.email || "guest@cmhsports.com";

    let userId = null;
    if (session?.user?.email) {
        const user = await prisma.user.findUnique({ where: { email: session.user.email } });
        if (user) userId = user.id;
    }

    // Create the order
    const order = await prisma.order.create({
        data: {
            userId: userId,
            totalAmount: amount,
            status: "PENDING",
            items: {
                create: items.map(item => ({
                    productId: item.id,
                    quantity: item.quantity,
                    price: item.price
                }))
            }
        }
    });

    const baseUrl = getBaseUrl();
    const callbackUrl = `${baseUrl}/payment/callback?orderId=${order.id}`;

    console.log("Payload:", { email, amount, callbackUrl });

    const response = await initializePayment(email, amount, callbackUrl);

    console.log("Paystack Response:", response);

    if (response.status && response.data) {
        console.log("Redirecting to:", response.data.authorization_url);
        redirect(response.data.authorization_url);
    } else {
        console.error("Payment initialization failed", response);
        throw new Error("Payment initialization failed: " + (response.message || 'Unknown error'));
    }
}

export async function registerAndPay(formData: FormData) {
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const plan = formData.get("plan") as string;
    let amount = 0;

    // Determine amount based on plan
    if (plan === 'weekly') amount = 1200;
    else if (plan === 'monthly') amount = 4000;
    else if (plan === 'free') {
        const hashedPassword = await hash(password, 10);
        let user = await prisma.user.findUnique({ where: { email } });

        if (!user) {
            user = await prisma.user.create({
                data: { name, email, password: hashedPassword, role: 'USER' }
            });
        }

        await createSession({ name: user.name || '', email: user.email || '', role: user.role });
        redirect('/dashboard');
        return;
    }

    let user = await prisma.user.findUnique({ where: { email } });
    const hashedPassword = await hash(password, 10);

    if (!user) {
        user = await prisma.user.create({
            data: { name, email, password: hashedPassword, role: 'USER' }
        });
    }

    await createSession({ name: user.name || '', email: user.email || '', role: user.role });

    const baseUrl = getBaseUrl();
    const callbackUrl = `${baseUrl}/payment/callback?plan=${plan}&userId=${user.id}`;

    let authUrl = null;
    try {
        const response = await initializePayment(email, amount, callbackUrl);

        if (response.status && response.data) {
            authUrl = response.data.authorization_url;
        } else {
            console.error("Payment init failed:", response);
            throw new Error("Payment initialization failed");
        }
    } catch (error) {
        console.error("Payment error:", error);
        throw error;
    }
    
    if (authUrl) {
        redirect(authUrl);
    }
}
