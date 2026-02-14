import { getLeagues } from "@/lib/football-api";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const revalidate = 86400; // Cache for 24 hours

export default async function LeaguesPage() {
    const leagues = await getLeagues();

    return (
        <div className="bg-black min-h-screen pb-20">
            <div className="bg-zinc-900 border-b border-white/10 py-16">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-5xl font-bold uppercase tracking-tighter text-white mb-4">Major <span className="text-primary">Leagues</span></h1>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        Follow the latest action, news, and stats from the world's top football competitions.
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4 mt-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {leagues.map((league) => (
                        <Link key={league.id} href="#" className="group">
                            <div className="bg-zinc-900 border border-white/5 p-8 rounded-sm hover:border-primary/50 transition-all hover:-translate-y-1 h-full flex flex-col items-center text-center">
                                <div className="w-24 h-24 mb-6 bg-white/5 rounded-full flex items-center justify-center p-4 group-hover:bg-white/10 transition-colors">
                                    <img src={league.logo} alt={league.name} className="w-full h-full object-contain" />
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-2 uppercase group-hover:text-primary transition-colors">{league.name}</h3>
                                <p className="text-gray-500 text-sm font-bold uppercase mb-6 flex items-center gap-2 justify-center">
                                    <img src={league.flag} alt={league.country} className="w-4 h-4 rounded-full object-cover" />
                                    {league.country}
                                </p>
                                <span className="mt-auto inline-flex items-center text-primary font-bold uppercase text-sm">
                                    View Competition <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                                </span>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
