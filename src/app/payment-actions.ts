'use server'

import { redirect } from "next/navigation";
import { initializePayment } from "@/lib/paystack";

export async function initiateCheckout(amount: number) {
    console.log("🚀 initiateCheckout called with amount:", amount);

    // In a real app you'd get the user's email from session
    const email = "customer@example.com";

    // Hardcoded URL for dev, should be ENV variable
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
