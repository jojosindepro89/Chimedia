'use server'

import { redirect } from "next/navigation";
import { initializePayment } from "@/lib/paystack";
import { prisma } from "@/lib/prisma";
import { hash } from "bcryptjs";
import { createSession } from "@/lib/session";

export async function initiateCheckout(amount: number) {
    console.log("🚀 initiateCheckout called with amount:", amount);

    // In a real app you'd get the user's email from session
    const email = "customer@example.com";

    // callback URL
    const callbackUrl = `${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/payment/callback`;

    console.log("Payload:", { email, amount, callbackUrl });

    const response = await initializePayment(email, amount, callbackUrl);

    console.log("Paystack Response:", response);

    if (response.status && response.data) {
        console.log("Redirecting to:", response.data.authorization_url);
        redirect(response.data.authorization_url);
    } else {
        // Handle error
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
        // Free plan logic
        // Create user
        const hashedPassword = await hash(password, 10);
        let user = await prisma.user.findUnique({ where: { email } });

        if (!user) {
            user = await prisma.user.create({
                data: {
                    name,
                    email,
                    password: hashedPassword,
                    role: 'USER',
                }
            });
        }

        // Create session
        await createSession({ name: user.name || '', email: user.email || '', role: user.role });

        // Redirect to dashboard
        redirect('/dashboard');
        return;
    }

    // 1. Check if user exists or create new
    let user = await prisma.user.findUnique({ where: { email } });

    // Hash password
    const hashedPassword = await hash(password, 10);

    if (!user) {
        user = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword, // In production, use bcrypt hash
                role: 'USER',
            }
        });
    } else {
        // Optional: Verify password if logging in existing user
        // For now, we assume if they are paying, we just proceed
    }

    // 2. Create Session
    await createSession({ name: user.name || '', email: user.email || '', role: user.role });

    // 3. Initiate Payment
    const callbackUrl = `${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/payment/callback?plan=${plan}&userId=${user.id}`;

    try {
        const response = await initializePayment(email, amount, callbackUrl);

        if (response.status && response.data) {
            redirect(response.data.authorization_url);
        } else {
            console.error("Payment init failed:", response);
            // Return error state (need to handle this in UI)
            throw new Error("Payment initialization failed");
        }
    } catch (error) {
        console.error("Payment error:", error);
        throw error;
    }
}
