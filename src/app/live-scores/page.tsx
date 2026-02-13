"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Search, Clock, Calendar, Filter } from "lucide-react";
import clsx from "clsx";

const MOCK_MATCHES = [
    {
        id: "match-1",
        league: "Premier League",
        home: "Manchester City",
        away: "Liverpool",
        homeLogo: "https://upload.wikimedia.org/wikipedia/en/e/eb/Manchester_City_FC_badge.svg",
        awayLogo: "https://upload.wikimedia.org/wikipedia/en/0/0c/Liverpool_FC.svg",
        score: "2 - 1",
        time: "75'",
        status: "LIVE",
        date: "Today"
    },
    {
        id: "match-2",
        league: "La Liga",
        home: "Barcelona",
        away: "Real Madrid",
        homeLogo: "https://upload.wikimedia.org/wikipedia/en/4/47/FC_Barcelona_%28crest%29.svg",
        awayLogo: "https://upload.wikimedia.org/wikipedia/en/5/56/Real_Madrid_CF.svg",
        score: "0 - 0",
        time: "20:00",
        status: "SCHEDULED",
        date: "Today"
    },
    {
        id: "match-3",
        league: "Serie A",
        home: "Inter Milan",
        away: "Juventus",
        homeLogo: "https://upload.wikimedia.org/wikipedia/en/0/05/FC_Internazionale_Milano_2021.svg",
        awayLogo: "https://upload.wikimedia.org/wikipedia/commons/5/51/Juventus_FC_2017_icon_%28black%29.svg",
        score: "1 - 1",
        time: "FT",
        status: "FINISHED",
        date: "Yesterday"
    }
];

export default function LiveScoresPage() {
    const [activeTab, setActiveTab] = useState("Today");
    const [matches, setMatches] = useState(MOCK_MATCHES);

    useEffect(() => {
        // Simulate auto-refresh
        const interval = setInterval(() => {
            console.log("Refreshing scores...");
        }, 20000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="bg-black min-h-screen text-white pb-20">
            {/* Header */}
            <div className="bg-zinc-900 border-b border-white/10 py-12">
                <div className="container mx-auto px-4">
                    <h1 className="text-4xl font-bold uppercase tracking-tighter mb-8">Live <span className="text-primary">Scores</span></h1>

                    {/* Tabs */}
                    <div className="flex space-x-1 bg-black p-1 rounded-sm w-fit border border-white/10">
                        {["Live Now", "Today", "Tomorrow"].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={clsx(
                                    "px-6 py-2 rounded-sm text-sm font-bold uppercase transition-all",
                                    activeTab === tab ? "bg-primary text-black" : "text-gray-400 hover:text-white"
                                )}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Filters & Search */}
            <div className="container mx-auto px-4 mt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="flex bg-zinc-900 border border-white/10 rounded-sm px-4 py-2 w-full md:w-auto">
                    <Search className="w-5 h-5 text-gray-500 mr-2" />
                    <input type="text" placeholder="Search team or league..." className="bg-transparent text-white focus:outline-none placeholder-gray-500 text-sm w-full" />
                </div>
                <div className="flex space-x-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
                    {["All", "Premier League", "La Liga", "Serie A", "Bundesliga"].map((league) => (
                        <button key={league} className="px-4 py-2 bg-zinc-900 border border-white/10 rounded-sm text-xs font-bold uppercase text-gray-400 hover:text-white hover:border-primary transition-colors whitespace-nowrap">
                            {league}
                        </button>
                    ))}
                </div>
            </div>

            {/* Match List */}
            <div className="container mx-auto px-4 mt-8 space-y-4">
                {matches.map((match) => (
                    <Link href={`/live-match/${match.id}`} key={match.id}>
                        <div className="bg-zinc-900 border border-white/5 p-4 rounded-sm flex flex-col md:flex-row items-center justify-between hover:border-primary/50 transition-all cursor-pointer group">

                            {/* League & Time */}
                            <div className="flex items-center space-x-4 w-full md:w-1/4 mb-4 md:mb-0">
                                <span className={clsx(
                                    "text-xs font-bold px-2 py-1 rounded-sm uppercase w-16 text-center",
                                    match.status === "LIVE" ? "bg-red-600 text-white animate-pulse" : "bg-black text-gray-400"
                                )}>
                                    {match.status === "LIVE" ? match.time : match.status}
                                </span>
                                <span className="text-gray-400 text-xs font-bold uppercase">{match.league}</span>
                            </div>

                            {/* Scoreboard */}
                            <div className="flex items-center justify-center space-x-8 w-full md:w-2/4 mb-4 md:mb-0">
                                <div className="flex items-center space-x-3 text-right flex-1 justify-end">
                                    <span className="text-lg font-bold group-hover:text-primary transition-colors">{match.home}</span>
                                    {/* Placeholder Logo */}
                                    <div className="w-8 h-8 rounded-full bg-gray-800 flex-shrink-0"></div>
                                </div>

                                <div className="text-2xl font-bold bg-black px-4 py-2 rounded-sm border border-white/10 font-mono tracking-widest">
                                    {match.status === "SCHEDULED" ? match.time : match.score}
                                </div>

                                <div className="flex items-center space-x-3 text-left flex-1 justify-start">
                                    <div className="w-8 h-8 rounded-full bg-gray-800 flex-shrink-0"></div>
                                    <span className="text-lg font-bold group-hover:text-primary transition-colors">{match.away}</span>
                                </div>
                            </div>

                            {/* Fav Button (Mock) */}
                            <div className="w-full md:w-1/4 flex justify-end">
                                <button className="text-gray-600 hover:text-primary transition-colors">
                                    <span className="text-xs uppercase font-bold border border-white/10 px-3 py-1 rounded hover:bg-white hover:text-black hover:border-white transition-all">Match Details</span>
                                </button>
                            </div>

                        </div>
                    </Link>
                ))}

                <div className="text-center mt-8 text-gray-500 text-sm flex items-center justify-center">
                    <Clock className="w-4 h-4 mr-2" /> Auto-updating every 20 seconds
                </div>
            </div>
        </div>
    );
}
