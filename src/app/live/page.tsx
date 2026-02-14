import { getLiveMatches } from "@/lib/football-api";
import Link from "next/link";
import { Play, ArrowRight } from "lucide-react";

export const revalidate = 60;

export default async function LiveHubPage() {
    const matches = await getLiveMatches();
    const liveMatches = matches.filter(m => ["LIVE", "1H", "2H", "HT", "ET", "P"].includes(m.status.short));

    return (
        <div className="bg-black min-h-screen pb-20">
            {/* Hero Section */}
            <div className="relative bg-zinc-900 border-b border-white/10 overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1522778119026-d647f0565c6a?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-20"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/50"></div>

                <div className="relative container mx-auto px-4 py-24 text-center">
                    <span className="inline-block py-1 px-3 rounded-full bg-red-600/20 text-red-500 font-bold uppercase text-xs mb-4 border border-red-600/50 animate-pulse">
                        Live Now
                    </span>
                    <h1 className="text-5xl md:text-7xl font-bold uppercase tracking-tighter text-white mb-6">
                        Match <span className="text-primary">Center</span>
                    </h1>
                    <p className="text-gray-400 max-w-2xl mx-auto text-lg mb-8">
                        Experience the game live. Watch streams, track real-time stats, and follow every moment of the action.
                    </p>
                </div>
            </div>

            {/* Live Grid */}
            <div className="container mx-auto px-4 -mt-10 relative z-10">
                {liveMatches.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {liveMatches.map((match) => (
                            <Link key={match.id} href={`/live-match/${match.id}`} className="group">
                                <div className="bg-zinc-900 border border-white/10 rounded-lg overflow-hidden hover:border-primary/50 transition-all hover:-translate-y-1 shadow-2xl">
                                    {/* Match Header */}
                                    <div className="bg-white/5 p-4 flex justify-between items-center border-b border-white/5">
                                        <div className="flex items-center gap-2">
                                            <img src={match.league.logo} alt={match.league.name} className="w-6 h-6 object-contain" />
                                            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">{match.league.name}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-red-500 font-bold text-xs uppercase animate-pulse">
                                            <span className="w-2 h-2 rounded-full bg-red-500"></span>
                                            {match.status.elapsed}'
                                        </div>
                                    </div>

                                    {/* Score Board */}
                                    <div className="p-8">
                                        <div className="flex items-center justify-between gap-8 mb-8">
                                            <div className="flex flex-col items-center gap-4 flex-1">
                                                <div className="w-16 h-16 bg-black/20 rounded-full p-2 flex items-center justify-center">
                                                    <img src={match.home.logo} alt={match.home.name} className="w-full h-full object-contain" />
                                                </div>
                                                <span className="text-center font-bold uppercase text-sm">{match.home.name}</span>
                                            </div>

                                            <div className="text-4xl font-mono font-bold text-white bg-black/20 px-4 py-2 rounded">
                                                {match.goals.home} - {match.goals.away}
                                            </div>

                                            <div className="flex flex-col items-center gap-4 flex-1">
                                                <div className="w-16 h-16 bg-black/20 rounded-full p-2 flex items-center justify-center">
                                                    <img src={match.away.logo} alt={match.away.name} className="w-full h-full object-contain" />
                                                </div>
                                                <span className="text-center font-bold uppercase text-sm">{match.away.name}</span>
                                            </div>
                                        </div>

                                        <button className="w-full bg-primary text-black font-bold uppercase py-3 rounded flex items-center justify-center gap-2 group-hover:bg-white transition-colors">
                                            <Play className="w-4 h-4 fill-current" /> Watch Live
                                        </button>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                ) : (
                    <div className="bg-zinc-900 border border-white/10 rounded-lg p-12 text-center">
                        <div className="w-16 h-16 bg-zinc-800 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Play className="w-8 h-8 text-gray-600" />
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-2">No Matches Live Right Now</h3>
                        <p className="text-gray-500 mb-8">Check back later for live action or view upcoming fixtures.</p>
                        <Link href="/live-scores" className="inline-flex items-center text-primary font-bold uppercase hover:text-white transition-colors">
                            View Schedule <ArrowRight className="w-4 h-4 ml-2" />
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}
