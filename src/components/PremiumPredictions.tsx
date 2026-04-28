import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Lock, TrendingUp, Trophy } from "lucide-react";

export default async function PremiumPredictions() {
    const premiumPredictions = await prisma.prediction.findMany({
        where: { isPremium: true },
        orderBy: { date: 'desc' },
        take: 3
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

                    <div className="bg-zinc-950 p-4 rounded border border-white/5 mb-4 backdrop-blur-sm relative">
                        <div className="flex justify-between items-center relative z-10">
                            <div>
                                <span className="text-xs text-gray-500 uppercase block mb-1">Market</span>
                                <span className="text-white font-bold">{prediction.market}</span>
                            </div>
                            <div className="text-right">
                                <span className="text-xs text-gray-500 uppercase block mb-1">Odds</span>
                                <span className="text-primary font-black text-xl">{prediction.odds.toFixed(2)}</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-between items-center">
                        <span className="text-sm font-bold text-gray-400">Confidence: {prediction.confidence}%</span>
                        
                        <Link href="/membership" className="bg-white/10 hover:bg-primary text-white hover:text-black p-2 rounded transition-colors" title="Unlock Prediction">
                            <Lock className="w-5 h-5" />
                        </Link>
                    </div>
                </div>
            ))}
        </div>
    );
}
