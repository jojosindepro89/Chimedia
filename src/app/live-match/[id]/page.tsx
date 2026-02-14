import Link from "next/link";
import { ArrowLeft, BarChart2 } from "lucide-react";
import { getMatchDetails } from "@/lib/football-api";
import { notFound } from "next/navigation";

export const revalidate = 60;

export default async function LiveMatchPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const match = await getMatchDetails(id);

    if (!match) return notFound();

    return (
        <div className="bg-black min-h-screen text-white pb-20">
            {/* Header Back */}
            <div className="bg-zinc-900 border-b border-white/10 py-4">
                <div className="container mx-auto px-4">
                    <Link href="/live-scores" className="inline-flex items-center text-gray-400 hover:text-white transition-colors text-sm uppercase font-bold">
                        <ArrowLeft className="w-4 h-4 mr-2" /> Back to Live Scores
                    </Link>
                </div>
            </div>

            {/* Match Header */}
            <div className="bg-black py-12 border-b border-white/10">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16">
                        <div className="text-center">
                            <div className="w-20 h-20 bg-zinc-800 rounded-full mx-auto mb-4 border-2 border-transparent hover:border-primary transition-colors flex items-center justify-center p-2">
                                <img src={match.home.logo} alt={match.home.name} className="w-full h-full object-contain" />
                            </div>
                            <h2 className="text-2xl font-bold uppercase">{match.home.name}</h2>
                        </div>

                        <div className="text-center">
                            <div className="text-4xl font-bold font-mono bg-zinc-900 px-6 py-3 rounded border border-white/10 mb-2">
                                {match.status.short === "NS" ? "VS" : `${match.goals.home} - ${match.goals.away}`}
                            </div>
                            <span className={clsx(
                                "font-bold uppercase flex items-center justify-center gap-2",
                                match.status.short === "LIVE" ? "text-red-500 animate-pulse" : "text-gray-500"
                            )}>
                                {match.status.short === "LIVE" && <span className="w-2 h-2 rounded-full bg-red-500"></span>}
                                {match.status.long} {match.status.elapsed && `. ${match.status.elapsed}'`}
                            </span>
                        </div>

                        <div className="text-center">
                            <div className="w-20 h-20 bg-zinc-800 rounded-full mx-auto mb-4 border-2 border-transparent hover:border-primary transition-colors flex items-center justify-center p-2">
                                <img src={match.away.logo} alt={match.away.name} className="w-full h-full object-contain" />
                            </div>
                            <h2 className="text-2xl font-bold uppercase">{match.away.name}</h2>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content Grid */}
            <div className="container mx-auto px-4 mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left: Stream / Visuals */}
                <div className="lg:col-span-2 space-y-8">
                    {/* Stream Embed */}
                    <div className="bg-zinc-900 border border-white/5 rounded overflow-hidden shadow-2xl relative aspect-video group">
                        <iframe
                            src="https://yallalive.sx/page/87/"
                            className="w-full h-full border-0"
                            allow="autoplay; encrypted-media"
                            allowFullScreen
                            title="Live Stream"
                        />
                        <div className="absolute top-4 right-4 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded uppercase animate-pulse z-10 pointer-events-none">
                            Live Stream
                        </div>
                    </div>

                    {/* Match Events Timeline (Mock) */}
                    <div className="bg-zinc-900 border border-white/5 p-6 rounded">
                        <h3 className="text-xl font-bold text-white mb-6 uppercase border-l-4 border-primary pl-4">Match Events</h3>
                        <div className="space-y-4">
                            <div className="flex gap-4">
                                <span className="text-primary font-bold w-8">--</span>
                                <p className="text-gray-300">Events data coming soon...</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right: Stats & Predictions */}
                <div className="lg:col-span-1 space-y-8">
                    {/* Stats */}
                    <div className="bg-zinc-900 border border-white/5 p-6 rounded">
                        <h3 className="text-lg font-bold text-white mb-6 uppercase flex items-center gap-2">
                            <BarChart2 className="w-5 h-5 text-primary" /> Match Stats
                        </h3>
                        <div className="space-y-4">
                            <p className="text-gray-500 text-sm text-center">Stats available after kickoff</p>
                        </div>
                    </div>

                    {/* Predictions CTA */}
                    <div className="bg-gradient-to-br from-primary to-yellow-600 p-6 rounded text-black text-center">
                        <h3 className="text-2xl font-bold uppercase mb-2">Live Prediction</h3>
                        <p className="text-sm font-medium mb-4">Our AI predicts a result.</p>
                        <div className="bg-black/10 p-4 rounded mb-4">
                            <span className="block text-xs uppercase font-bold mb-1">Tip</span>
                            <span className="text-xl font-bold">Premium Only</span>
                        </div>
                        <button className="w-full bg-black text-primary font-bold uppercase py-3 rounded hover:bg-zinc-800 transition-colors">
                            Bet Now
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

import clsx from "clsx";

function StatRow({ label, left, right }: { label: string, left: string, right: string }) {
    return (
        <div className="flex justify-between items-center text-sm">
            <span className="font-bold text-white w-12 text-center">{left}</span>
            <span className="text-gray-500 uppercase text-xs flex-1 text-center">{label}</span>
            <span className="font-bold text-white w-12 text-center">{right}</span>
        </div>
    )
}
