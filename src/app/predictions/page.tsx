import { getDailyPredictions } from "@/lib/prediction-service";
import { getSession } from "@/lib/session";
import { prisma } from "@/lib/prisma";
import PredictionsClient from "./PredictionsClient";

export const dynamic = 'force-dynamic';

export default async function PredictionsPage() {
    const { free, premium } = await getDailyPredictions();

    // Check real subscription status
    const session = await getSession();
    let isPremiumMember = false;

    if (session?.user?.email) {
        // Check DB for active subscription
        const userWithSub = await prisma.user.findUnique({
            where: { email: session.user.email },
            include: { subscription: true }
        });

        if (userWithSub?.subscription?.status === 'ACTIVE' && new Date(userWithSub.subscription.endDate) > new Date()) {
            isPremiumMember = true;
        }
    }

    // Find a "Banker" for the Free section (Highest confidence free tip)
    // Avoid error if free tips are empty
    const banker = free.length > 0 ? free.reduce((prev, current) => (prev.confidence > current.confidence) ? prev : current) : null;

    return (
        <PredictionsClient
            freeTips={free}
            premiumTips={premium}
            banker={banker}
            isPremiumMember={isPremiumMember}
        />
    );
}
