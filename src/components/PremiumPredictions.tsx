import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Lock, TrendingUp, Trophy, Unlock } from "lucide-react";
import { getSession } from "@/lib/session";

export default async function PremiumPredictions() {
    const session = await getSession();
    let isPremiumMember = false;

    if (session?.user?.email) {
        const userWithSub = await prisma.user.findUnique({
            where: { email: session.user.email },
            include: { subscription: true }
        });
        if (userWithSub?.subscription?.status === 'ACTIVE' && new Date(userWithSub.subscription.endDate) > new Date()) {
            isPremiumMember = true;
        }
    }

    const premiumPredictions = await prisma.prediction.findMany({
        where: { isPremium: true },
        orderBy: { date: 'desc' },
        take: 3,
        include: { fixture: true }
    });

    if (premiumPredictions.length === 0) {
        return (
            <div className="text-gray-500 py-10 text-center">
                <p>No premium predictions available at the moment.</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {premiumPredictions.map((prediction) => (
                <div key={prediction.id} className="bg-gradient-to-br from-zinc-900 to-black border border-primary/20 p-6 rounded relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-20 h-20 bg-primary/10 rounded-bl-full -z-10 group-hover:scale-150 transition-transform duration-500"></div>
                    
                    <div className="text-xs bg-primary text-black inline-flex items-center gap-1 font-bold px-3 py-1 uppercase rounded-sm mb-4">
                        <Trophy className="w-3 h-3" /> Premium Tip
                    </div>

                    <div className="flex justify-between items-start mb-4">
                        <div>
                            <span className="text-sm text-gray-400 block mb-1">{new Date(prediction.date).toLocaleDateString([], { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</span>
                            <h3 className="text-xl font-bold text-white">{prediction.matchTitle || prediction.fixture?.homeTeam + " vs " + prediction.fixture?.awayTeam}</h3>
                            <span className="text-xs text-primary font-mono">{prediction.league}</span>
                        </div>
                    </div>

                    <div className="bg-zinc-950 p-4 rounded border border-white/5 mb-4 relative overflow-hidden group/lock">
                        {/* The actual content */}
                        <div className={`transition-all duration-300 ${!isPremiumMember ? 'blur-sm select-none opacity-50' : ''}`}>
                            <div className="flex justify-between items-center mb-2">
                                <div>
                                    <span className="text-xs text-gray-500 uppercase block mb-1">Market</span>
                                    <span className="text-white font-bold">{prediction.market}</span>
                                </div>
                                <div className="text-right">
                                    <span className="text-xs text-gray-500 uppercase block mb-1">Odds</span>
                                    <span className="text-primary font-bold">{prediction.odds}</span>
                                </div>
                            </div>
                            <div className="pt-2 border-t border-white/10">
                                <span className="text-xs text-gray-500 uppercase block mb-1">Pick</span>
                                <span className="text-white font-bold text-lg">{prediction.selection}</span>
                            </div>
                        </div>

                        {/* Lock Overlay for non-premium users */}
                        {!isPremiumMember && (
                            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 z-10">
                                <Lock className="w-6 h-6 text-primary mb-2" />
                                <span className="text-xs font-bold text-white uppercase tracking-wider">VIP Only</span>
                            </div>
                        )}
                    </div>

                    <div className="flex justify-between items-center">
                        {!isPremiumMember ? (
                            <Link href="/membership" className="text-xs font-bold uppercase text-primary hover:text-white transition-colors flex items-center gap-1">
                                <Lock className="w-3 h-3" /> Unlock Now
                            </Link>
                        ) : (
                            <span className="text-xs font-bold uppercase text-green-500 flex items-center gap-1">
                                <Unlock className="w-3 h-3" /> Unlocked
                            </span>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
}
