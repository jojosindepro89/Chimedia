export const initializePayment = async (email: string, amount: number, callbackUrl: string) => {
    // Paystack Amount is in kobo (Lowest currency unit), so multiply by 100
    const params = {
        email,
        amount: amount * 100,
        callback_url: callbackUrl,
    }

    try {
        const res = await fetch('https://api.paystack.co/transaction/initialize', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(params)
        })
        const data = await res.json()
        return data; // Returns { status: true, message: "...", data: { authorization_url: "...", ... } }
    } catch (error) {
        console.error("Paystack Initialize Error:", error);
        return { status: false, message: "Payment initialization failed" };
    }
}

export const verifyPayment = async (reference: string) => {
    try {
        const res = await fetch(`https://api.paystack.co/transaction/verify/${reference}`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
            }
        })
        const data = await res.json()
        return data;
    } catch (error) {
        console.error("Paystack Verify Error:", error);
        return { status: false, message: "Payment verification failed" };
    }
}
