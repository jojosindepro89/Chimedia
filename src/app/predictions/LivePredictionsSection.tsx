"use client";

import { Activity, Brain, Target, TrendingUp, Clock, AlertTriangle } from "lucide-react";

const liveMatches = [
    {
        id: "l1",
        league: "Premier League",
        home: "Liverpool",
        away: "Chelsea",
        score: "1 - 1",
        minute: "64'",
        prediction: "Home to Score Next",
        confidence: 88,
        odds: 1.95,
        analysis: "Liverpool dominating possession (68%) with high xG in last 10 mins.",
        momentum: "Home"
    },
    {
        id: "l2",
        league: "La Liga",
        home: "Real Madrid",
        away: "Sevilla",
        score: "0 - 0",
        minute: "32'",
        prediction: "Over 0.5 First Half",
        confidence: 76,
        odds: 2.10,
        analysis: "Open game, both teams creating big chances.",
        momentum: "Neutral"
    },
    {
        id: "l3",
        league: "Serie A",
        home: "Juventus",
        away: "AC Milan",
        score: "2 - 1",
        minute: "81'",
        prediction: "Away to Score Next",
        confidence: 65,
        odds: 3.40,
        analysis: "Milan pushing hard for equalizer, Juventus sitting deep.",
        momentum: "Away"
    },
    {
        id: "l4",
        league: "Bundesliga",
        home: "Bayern Munich",
        away: "Dortmund",
        score: "3 - 2",
        minute: "89'",
        prediction: "Over 5.5 Goals",
        confidence: 92,
        odds: 1.50,
        analysis: "End-to-end game, defense nonexistent.",
        momentum: "Both"
    },
    {
        id: "l5",
        league: "Ligue 1",
        home: "PSG",
        away: "Lyon",
        score: "1 - 0",
        minute: "15'",
        prediction: "Home -1.5 Handicap",
        confidence: 85,
        odds: 1.80,
        analysis: "PSG early goal, Lyon looking shaky at the back.",
        momentum: "Home"
    },
    {
        id: "l6",
        league: "Eredivisie",
        home: "Ajax",
        away: "PSV",
        score: "0 - 2",
        minute: "55'",
        prediction: "Away Win",
        confidence: 95,
        odds: 1.10,
        analysis: "Ajax down to 10 men, PSV controlling comfortably.",
        momentum: "Away"
    },
    {
        id: "l7",
        league: "Championship",
        home: "Leicester",
        away: "Leeds",
        score: "1 - 1",
        minute: "70'",
        prediction: "Draw",
        confidence: 60,
        odds: 2.80,
        analysis: "Tight game, both teams canceling each other out.",
        momentum: "Neutral"
    },
    {
        id: "l8",
        league: "Primeira Liga",
        home: "Benfica",
        away: "Porto",
        score: "0 - 0",
        minute: "40'",
        prediction: "Under 2.5 Goals",
        confidence: 78,
        odds: 1.65,
        analysis: "Very tactical match, few shots on target.",
        momentum: "Neutral"
    },
    {
        id: "l9",
        league: "Super Lig",
        home: "Galatasaray",
        away: "Fenerbahce",
        score: "2 - 2",
        minute: "90+2'",
        prediction: "Draw",
        confidence: 90,
        odds: 1.20,
        analysis: "Stoppage time, both teams settling.",
        momentum: "Neutral"
    },
    {
        id: "l10",
        league: "Brasileirão",
        home: "Flamengo",
        away: "Palmeiras",
        score: "1 - 2",
        minute: "60'",
        prediction: "Over 3.5 Goals",
        confidence: 82,
        odds: 2.00,
        analysis: "High tempo game, lots of space on counter.",
        momentum: "Away"
    },
    {
        id: "l11",
        league: "Friendly",
        home: "USA",
        away: "Mexico",
        score: "0 - 1",
        minute: "22'",
        prediction: "Home to Score Next",
        confidence: 70,
        odds: 2.50,
        analysis: "USA creating chances despite conceding early.",
        momentum: "Home"
    },
    {
        id: "l12",
        league: "Serie B",
        home: "Parma",
        away: "Como",
        score: "0 - 0",
        minute: "10'",
        prediction: "Home Win",
        confidence: 80,
        odds: 1.70,
        analysis: "Parma started strong, dominating possession.",
        momentum: "Home"
    },
    {
        id: "l13",
        league: "League One",
        home: "Bolton",
        away: "Derby",
        score: "1 - 3",
        minute: "75'",
        prediction: "No More Goals",
        confidence: 65,
        odds: 1.90,
        analysis: "Derby parking the bus to protect lead.",
        momentum: "Away"
    },
    {
        id: "l14",
        league: "Scottish Prem",
        home: "Celtic",
        away: "Rangers",
        score: "2 - 2",
        minute: "85'",
        prediction: "Home to Score Next",
        confidence: 68,
        odds: 3.00,
        analysis: "Celtic piling on pressure at home.",
        momentum: "Home"
    },
    {
        id: "l15",
        league: "La Liga 2",
        home: "Espanyol",
        away: "Eibar",
        score: "0 - 1",
        minute: "44'",
        prediction: "Home Not to Lose",
        confidence: 72,
        odds: 1.85,
        analysis: "Espanyol unlucky to be behind, expected to bounce back.",
        momentum: "Home"
    },
    {
        id: "l16",
        league: "Belgian Pro League",
        home: "Club Brugge",
        away: "Anderlecht",
        score: "3 - 0",
        minute: "68'",
        prediction: "Over 3.5 Goals",
        confidence: 85,
        odds: 2.10,
        analysis: "Brugge looking for more, Anderlecht defense collapsing.",
        momentum: "Home"
    },
    {
        id: "l17",
        league: "A-League",
        home: "Sydney FC",
        away: "Melbourne City",
        score: "1 - 1",
        minute: "50'",
        prediction: "Over 2.5 Goals",
        confidence: 88,
        odds: 1.60,
        analysis: "Open game, lots of shots.",
        momentum: "Both"
    },
    {
        id: "l18",
        league: "Saudi Pro League",
        home: "Al Hilal",
        away: "Al Nassr",
        score: "2 - 3",
        minute: "80'",
        prediction: "Away Win",
        confidence: 90,
        odds: 1.25,
        analysis: "Ronaldo hatrick likely to seal it.",
        momentum: "Away"
    },
    {
        id: "l19",
        league: "MLS",
        home: "Inter Miami",
        away: "LA Galaxy",
        score: "1 - 0",
        minute: "12'",
        prediction: "Home -1.5",
        confidence: 82,
        odds: 2.20,
        analysis: "Messi orchestrating nicely.",
        momentum: "Home"
    },
    {
        id: "l20",
        league: "J-League",
        home: "Vissel Kobe",
        away: "Yokohama FM",
        score: "0 - 0",
        minute: "5'",
        prediction: "Over 0.5 First Half",
        confidence: 75,
        odds: 1.95,
        analysis: "Fast start from both sides.",
        momentum: "Both"
    },
];

export default function LivePredictionsSection() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between mb-8 overflow-hidden rounded-sm bg-primary/10 border border-primary/20 p-4">
                <div className="flex items-center gap-3">
                    <span className="relative flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-red-600"></span>
                    </span>
                    <h2 className="text-xl font-bold uppercase text-white tracking-widest">
                        Live AI Analysis <span className="text-zinc-500 ml-2 text-sm normal-case font-normal hidden sm:inline-block">Tracking {liveMatches.length} matches in real-time</span>
                    </h2>
                </div>
                <div className="flex items-center gap-2 text-primary text-xs font-mono">
                    <Activity className="w-4 h-4 animate-pulse" />
                    SYSTEM ACTIVE
                </div>
            </div>

            <div className="grid grid-cols-1 gap-4">
                {liveMatches.map((match) => (
                    <LiveMatchCard key={match.id} match={match} />
                ))}
            </div>
        </div>
    );
}

function LiveMatchCard({ match }: { match: typeof liveMatches[0] }) {
    return (
        <div className="bg-zinc-900 border border-white/5 rounded-sm overflow-hidden hover:border-primary/50 transition-all group">
            {/* Header: League & Time */}
            <div className="bg-black/40 px-4 py-2 flex justify-between items-center border-b border-white/5">
                <span className="text-[10px] sm:text-xs font-bold uppercase text-gray-500 tracking-wider flex items-center gap-1">
                    {match.league}
                </span>
                <span className="text-[10px] sm:text-xs font-bold text-red-500 animate-pulse flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {match.minute}
                </span>
            </div>

            <div className="p-4 sm:p-6 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">

                {/* Scoreboard */}
                <div className="md:col-span-4 flex justify-between items-center gap-4">
                    <div className="text-right flex-1">
                        <span className={`block font-bold text-white text-sm sm:text-base ${match.momentum === 'Home' ? 'text-primary' : ''}`}>{match.home}</span>
                    </div>
                    <div className="bg-black px-3 py-1 sm:px-4 sm:py-2 rounded border border-white/10 font-mono text-lg sm:text-xl font-bold text-white tracking-widest">
                        {match.score}
                    </div>
                    <div className="text-left flex-1">
                        <span className={`block font-bold text-white text-sm sm:text-base ${match.momentum === 'Away' ? 'text-primary' : ''}`}>{match.away}</span>
                    </div>
                </div>

                {/* AI Prediction Section */}
                <div className="md:col-span-6 bg-white/5 rounded p-3 sm:p-4 border border-white/5 relative overflow-hidden group-hover:bg-white/10 transition-colors">
                    <div className="absolute top-0 right-0 p-1 opacity-10">
                        <Brain className="w-12 h-12 text-white" />
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
                        <div>
                            <div className="flex items-center gap-2 mb-1">
                                <Target className="w-4 h-4 text-primary" />
                                <span className="text-xs text-primary font-bold uppercase tracking-wider">AI Prediction</span>
                            </div>
                            <span className="text-lg sm:text-xl font-bold text-white block">{match.prediction}</span>
                            <span className="text-xs text-gray-400 mt-1 block max-w-xs">{match.analysis}</span>
                        </div>

                        <div className="flex items-center gap-4 bg-black/50 p-2 rounded border border-white/10 self-start sm:self-auto">
                            <div className="text-center px-2">
                                <span className="block text-[10px] text-gray-500 uppercase font-bold">Conf.</span>
                                <span className={`block font-bold text-sm sm:text-base ${match.confidence > 80 ? 'text-green-500' : 'text-yellow-500'}`}>{match.confidence}%</span>
                            </div>
                            <div className="w-px h-6 bg-white/10"></div>
                            <div className="text-center px-2">
                                <span className="block text-[10px] text-gray-500 uppercase font-bold">Odds</span>
                                <span className="block font-bold text-primary text-sm sm:text-base">{match.odds.toFixed(2)}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Action / Trend */}
                <div className="md:col-span-2 flex justify-end">
                    <button className="w-full md:w-auto bg-primary text-black font-bold uppercase text-xs py-2 px-3 rounded hover:bg-yellow-400 transition-colors flex items-center justify-center gap-2">
                        <TrendingUp className="w-4 h-4" /> Bet Now
                    </button>
                </div>

            </div>
        </div>
    )
}
