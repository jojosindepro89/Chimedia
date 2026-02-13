import Link from "next/link";
import { ArrowRight, RefreshCw, CheckCircle, HelpCircle } from "lucide-react";

export default function TransfersPage() {
    return (
        <div className="bg-black min-h-screen pb-20">
            <div className="bg-zinc-900 border-b border-white/10 py-16">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-5xl font-bold uppercase tracking-tighter text-white mb-4">Transfer <span className="text-primary">Center</span></h1>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        The reliable source for confirmed deals, contract talks, and market rumors.
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4 mt-12 grid grid-cols-1 lg:grid-cols-3 gap-12">

                {/* Main Feed */}
                <div className="lg:col-span-2 space-y-8">
                    <h2 className="text-2xl font-bold text-white uppercase border-l-4 border-primary pl-4 mb-8">Latest Rumors</h2>
                    {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="bg-zinc-900 border border-white/5 p-6 rounded-sm flex gap-6 hover:border-white/20 transition-colors cursor-pointer">
                            <div className="w-24 h-24 bg-zinc-800 flex-shrink-0"></div>
                            <div>
                                <div className="flex items-center gap-2 mb-2">
                                    <span className="bg-yellow-500/10 text-yellow-500 text-xs font-bold px-2 py-1 uppercase rounded flex items-center gap-1">
                                        <HelpCircle className="w-3 h-3" /> Rumor
                                    </span>
                                    <span className="text-gray-500 text-xs">2 hours ago</span>
                                </div>
                                <h3 className="text-xl font-bold text-white mb-2 leading-tight hover:text-primary transition-colors">
                                    Manchester United preparing massive bid for Benfica star
                                </h3>
                                <p className="text-gray-400 text-sm line-clamp-2">
                                    Reports from Portugal suggest that the Red Devils are willing to trigger the release clause...
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Sidebar - Confirmed Deals */}
                <div>
                    <h2 className="text-2xl font-bold text-white uppercase border-l-4 border-green-500 pl-4 mb-8">Confirmed Deals</h2>
                    <div className="bg-zinc-900 border border-white/5 rounded-sm overflow-hidden">
                        {[1, 2, 3, 4, 5].map((i) => (
                            <div key={i} className="p-4 border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="font-bold text-white text-sm">Player Name {i}</span>
                                    <span className="text-green-500 text-xs font-bold bg-green-500/10 px-2 py-1 rounded flex items-center gap-1">
                                        <CheckCircle className="w-3 h-3" /> Done
                                    </span>
                                </div>
                                <div className="flex items-center gap-3 text-xs text-gray-400">
                                    <span className="font-bold">Club A</span>
                                    <ArrowRight className="w-3 h-3" />
                                    <span className="font-bold text-primary">Club B</span>
                                </div>
                                <div className="mt-2 text-xs text-gray-500">Fee: $45m • 5yr Deal</div>
                            </div>
                        ))}
                        <Link href="#" className="block text-center bg-zinc-800 text-white font-bold uppercase py-3 text-sm hover:bg-zinc-700 transition-colors">
                            View All Deals
                        </Link>
                    </div>
                </div>

            </div>
        </div>
    );
}
