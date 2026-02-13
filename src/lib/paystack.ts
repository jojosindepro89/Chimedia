export const initializePayment = async (email: string, amount: number, callbackUrl: string) => {
    // Paystack Amount is in kobo (Lowest currency unit), so multiply by 100
    // But since this is a mock implementation for now (no real API keys provided by user yet, but they asked for API integration),
    // I will set up the structure.

    // In a real scenario:
    /*
    const res = await fetch('https://api.paystack.co/transaction/initialize', {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, amount: amount * 100, callback_url: callbackUrl })
    })
    return await res.json()
    */

    // Mocking the response for now until keys are added to .env
    console.log(`[Paystack Mock] Initializing payment for ${email} of amount ${amount}`);

    return {
        status: true,
        message: "Authorization URL created",
        data: {
            authorization_url: `${callbackUrl}?trxref=mock_${Date.now()}&reference=mock_${Date.now()}`,
            access_code: `mock_${Date.now()}`,
            reference: `mock_${Date.now()}`
        }
    }
}

export const verifyPayment = async (reference: string) => {
    /*
    const res = await fetch(`https://api.paystack.co/transaction/verify/${reference}`, {
        headers: {
            Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        }
    })
    return await res.json()
    */

    console.log(`[Paystack Mock] Verifying payment for reference ${reference}`);
    return {
        status: true,
        message: "Verification successful",
        data: {
            status: "success",
            reference,
            amount: 500000,
            gateway_response: "Successful"
        }
    }
}
