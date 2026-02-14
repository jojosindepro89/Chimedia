import { getFixtures } from "@/lib/football-api";
import Link from "next/link";
import { Clock } from "lucide-react";

export default async function UpcomingFixtures() {
    // Fetch fixtures for today
    const matches = await getFixtures();

    // Filter for Not Started (NS) or Live to show "Upcoming/Current"
    // Also limit to 6 for the homepage
    const upcoming = matches
        .filter(m => m.status.short === "NS" || m.status.short === "LIVE" || m.status.short === "1H" || m.status.short === "2H")
        .slice(0, 6);

    // If no upcoming matches today, show yesterday's results or just a message? 
    // Let's just show whatever we got, maybe sorted by time.

    if (upcoming.length === 0) {
        return (
            <div className="text-gray-500 py-10">
                <p>No featured matches at the moment. Check back later!</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcoming.map((match) => (
                <Link key={match.id} href={`/live-match/${match.id}`} className="block">
                    <div className="bg-zinc-900 border border-white/5 p-6 rounded hover:bg-zinc-800 transition-colors h-full flex flex-col justify-between group">
                        <div className="text-xs text-primary uppercase font-bold mb-4 flex justify-between items-center">
                            <span className="flex items-center gap-2">
                                {match.league.logo && <img src={match.league.logo} alt={match.league.name} className="w-4 h-4 object-contain" />}
                                {match.league.name}
                            </span>
                            <span className="text-gray-500">{new Date(match.fixture.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                        </div>

                        <div className="flex justify-between items-center mb-4">
                            <div className="flex flex-col items-center w-1/3">
                                <img src={match.home.logo} alt={match.home.name} className="w-12 h-12 mb-2 object-contain group-hover:scale-110 transition-transform" />
                                <span className="text-sm font-bold text-white text-center leading-tight">{match.home.name}</span>
                            </div>

                            <div className="flex flex-col items-center justify-center w-1/3">
                                <span className="text-xs text-gray-500 uppercase mb-1">VS</span>
                                {match.status.short === "NS" ? (
                                    <span className="text-xl font-bold text-gray-400">-:-</span>
                                ) : (
                                    <span className="text-xl font-bold text-primary">{match.goals.home} - {match.goals.away}</span>
                                )}
                            </div>

                            <div className="flex flex-col items-center w-1/3">
                                <img src={match.away.logo} alt={match.away.name} className="w-12 h-12 mb-2 object-contain group-hover:scale-110 transition-transform" />
                                <span className="text-sm font-bold text-white text-center leading-tight">{match.away.name}</span>
                            </div>
                        </div>

                        <div className="text-center border-t border-white/5 pt-4 mt-auto">
                            <span className={`text-xs uppercase font-bold px-3 py-1 rounded ${match.status.short === "NS" ? "bg-zinc-800 text-gray-300" : "bg-red-600/20 text-red-500 animate-pulse"}`}>
                                {match.status.long}
                            </span>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    );
}
