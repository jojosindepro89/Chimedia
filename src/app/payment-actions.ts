'use server'

import { redirect } from "next/navigation";
import { initializePayment } from "@/lib/paystack";

export async function initiateCheckout(amount: number) {
    // In a real app you'd get the user's email from session
    const email = "customer@example.com";

    // Hardcoded URL for dev, should be ENV variable
    const callbackUrl = "http://localhost:3000/payment/callback";

    const response = await initializePayment(email, amount, callbackUrl);

    if (response.status && response.data) {
        redirect(response.data.authorization_url);
    } else {
        // Handle error
        console.error("Payment initialization failed");
    }
}
