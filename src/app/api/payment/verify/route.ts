import { NextResponse } from 'next/server';
import { verifyPayment } from '@/lib/paystack';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
    try {
        const { reference, plan, userId, orderId } = await req.json();

        if (!reference) {
            return NextResponse.json({ success: false, message: 'Missing payment reference' }, { status: 400 });
        }

        const verifyResponse = await verifyPayment(reference);

        if (verifyResponse.status && verifyResponse.data?.status === 'success') {
            const isSubscription = !!(plan && userId);

            // Check if this was a subscription payment vs ordinary checkout
            if (isSubscription) {
                // Calculate end date based on plan
                const startDate = new Date();
                const endDate = new Date();

                if (plan.toLowerCase() === 'weekly') {
                    endDate.setDate(startDate.getDate() + 7);
                } else if (plan.toLowerCase() === 'monthly') {
                    endDate.setMonth(startDate.getMonth() + 1);
                } else {
                    endDate.setFullYear(startDate.getFullYear() + 1); // fallback
                }

                // Upsert subscription
                await prisma.subscription.upsert({
                    where: { userId },
                    update: {
                        plan: plan.toUpperCase(),
                        startDate,
                        endDate,
                        status: 'ACTIVE'
                    },
                    create: {
                        userId,
                        plan: plan.toUpperCase(),
                        startDate,
                        endDate,
                        status: 'ACTIVE'
                    }
                });
            } else if (orderId) {
                // Handle shop order completion
                await prisma.order.update({
                    where: { id: orderId },
                    data: { status: 'COMPLETED' }
                });
            }

            return NextResponse.json({ success: true, isSubscription });
        } else {
            return NextResponse.json({ success: false, message: 'Payment verification failed' }, { status: 400 });
        }
    } catch (error) {
        console.error("Verification error:", error);
        return NextResponse.json({ success: false, message: 'Internal Server Error' }, { status: 500 });
    }
}
