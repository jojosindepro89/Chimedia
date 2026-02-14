"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Search, Clock, Calendar, Filter } from "lucide-react";
import clsx from "clsx";

import { Match } from "@/lib/football-api";

interface LiveScoresClientProps {
    initialMatches: Match[];
}

export default function LiveScoresClient({ initialMatches }: LiveScoresClientProps) {
    const [activeTab, setActiveTab] = useState("Today");
    const [matches, setMatches] = useState<Match[]>(initialMatches);

    useEffect(() => {
        // In a real app, we'd poll an API route here to get updates
        // const interval = setInterval(async () => {
        //    const res = await fetch('/api/live-scores');
        //    const data = await res.json();
        //    setMatches(data);
        // }, 20000);
        // return () => clearInterval(interval);
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
                                    match.status.short === "LIVE" || match.status.short === "1H" || match.status.short === "2H" ? "bg-red-600 text-white animate-pulse" : "bg-black text-gray-400"
                                )}>
                                    {match.status.short === "NS" ? new Date(match.fixture.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : match.status.short}
                                </span>
                                <span className="text-gray-400 text-xs font-bold uppercase">{match.league.name}</span>
                            </div>

                            {/* Scoreboard */}
                            <div className="flex items-center justify-center space-x-8 w-full md:w-2/4 mb-4 md:mb-0">
                                <div className="flex items-center space-x-3 text-right flex-1 justify-end">
                                    <span className="text-lg font-bold group-hover:text-primary transition-colors">{match.home.name}</span>
                                    {/* Logo */}
                                    <img src={match.home.logo} alt={match.home.name} className="w-8 h-8 object-contain" />
                                </div>

                                <div className="text-2xl font-bold bg-black px-4 py-2 rounded-sm border border-white/10 font-mono tracking-widest whitespace-nowrap">
                                    {match.status.short === "NS" ? "VS" : `${match.goals.home} - ${match.goals.away}`}
                                </div>

                                <div className="flex items-center space-x-3 text-left flex-1 justify-start">
                                    <img src={match.away.logo} alt={match.away.name} className="w-8 h-8 object-contain" />
                                    <span className="text-lg font-bold group-hover:text-primary transition-colors">{match.away.name}</span>
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
