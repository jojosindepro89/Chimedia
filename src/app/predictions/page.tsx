import { getDailyPredictions } from "@/lib/prediction-service";
import { getSession } from "@/lib/session";
import { prisma } from "@/lib/prisma";
import PredictionsClient from "./PredictionsClient";

export const dynamic = 'force-dynamic';

export default async function PredictionsPage() {
    try {
        // 1. Fetch AI predictions from external API
        const { free, premium } = await getDailyPredictions();

        // 2. Fetch Admin manual predictions from the database
        let adminDbPredictions: any[] = [];
        try {
            adminDbPredictions = await prisma.prediction.findMany({
                where: { status: 'PENDING' },
                orderBy: { date: 'asc' }
            });
        } catch (e: any) {
            console.error("Prisma Error:", e);
            throw new Error(`Database Error: ${e.message}`);
        }

        const mappedAdminFree: any[] = [];
        const mappedAdminPremium: any[] = [];
        let adminBanker: any = null;

        adminDbPredictions.forEach(p => {
            const tip = {
                id: p.id,
                match: p.matchTitle,
                league: p.league || "Custom",
                time: p.date ? new Date(p.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : "TBA",
                market: p.market,
                selection: p.selection,
                odds: p.odds,
                confidence: p.confidence,
                analysis: null,
                status: p.status,
                isPremium: p.isPremium,
                isBanker: p.isBanker,
                leagueLogo: p.resultScore || null,
                codeImage: p.codeImage || null
            };

            if (p.isPremium) {
                mappedAdminPremium.push(tip);
            } else {
                mappedAdminFree.push(tip);
            }

            if (p.isBanker) {
                if (!adminBanker || tip.confidence > adminBanker.confidence) {
                    adminBanker = tip;
                }
            }
        });

        // Merge API predictions with Admin predictions (Admin takes precedence by appearing first)
        const combinedFree = [...mappedAdminFree, ...free];
        const combinedPremium = [...mappedAdminPremium, ...premium];

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
        const fallbackBanker = combinedFree.length > 0 ? combinedFree.reduce((prev, current) => (prev.confidence > current.confidence) ? prev : current) : null;
        const finalBanker = adminBanker || fallbackBanker;

        return (
            <PredictionsClient
                freeTips={combinedFree}
                premiumTips={combinedPremium}
                banker={finalBanker}
                isPremiumMember={isPremiumMember}
            />
        );
    } catch (error: any) {
        return (
            <div className="text-white p-20 mt-20 bg-black min-h-screen">
                <h1 className="text-red-500 text-2xl font-bold mb-4">Server Render Error</h1>
                <pre className="bg-gray-900 p-4 rounded overflow-auto text-sm">
                    {error?.stack || error?.message || String(error)}
                </pre>
            </div>
        );
    }
}
