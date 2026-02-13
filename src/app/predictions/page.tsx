"use client";

import { useState } from "react";
import { Lock, CheckCircle, XCircle, AlertCircle, Star } from "lucide-react";
import Link from "next/link";
import clsx from "clsx";

const FREE_TIPS = [
    { id: 1, match: "Chelsea vs Arsenal", market: "Over 2.5 Goals", odds: 1.85, confidence: 80, time: "17:30", status: "PENDING" },
    { id: 2, match: "Real Madrid vs Barcelona", market: "Home Win", odds: 2.10, confidence: 75, time: "20:00", status: "PENDING" },
    { id: 3, match: "Bayern Munich vs Dortmund", market: "Both Teams To Score", odds: 1.60, confidence: 90, time: "Yesterday", status: "WON" },
];

const PREMIUM_TIPS = [
    { id: 4, match: "Juventus vs AC Milan", market: "Home Win & Under 3.5", odds: 2.80, confidence: 95, time: "19:45", status: "PENDING" },
    { id: 5, match: "PSG vs Lyon", market: "Mbappe to Score", odds: 1.90, confidence: 85, time: "20:00", status: "PENDING" },
];

export default function PredictionsPage() {
    const [activeTab, setActiveTab] = useState("Free");
    const isPremiumMember = false; // Mock state

    return (
        <div className="bg-black min-h-screen pb-20">
            {/* Header */}
            <div className="bg-zinc-900 border-b border-white/10 py-16">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-5xl font-bold uppercase tracking-tighter text-white mb-4">Expert <span className="text-primary">Predictions</span></h1>
                    <p className="text-gray-400 max-w-2xl mx-auto mb-8">
                        Daily betting tips from our team of expert analysts. Upgrade to Premium for high-odds bankers.
                    </p>

                    <div className="flex justify-center space-x-4">
                        <TabButton active={activeTab === "Free"} onClick={() => setActiveTab("Free")}>Free Tips</TabButton>
                        <TabButton active={activeTab === "Premium"} onClick={() => setActiveTab("Premium")} isPremium>Premium Tips</TabButton>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="container mx-auto px-4 mt-12">
                {/* Banker of the Day */}
                {activeTab === "Free" && (
                    <div className="bg-gradient-to-r from-yellow-600 to-yellow-800 rounded-sm p-1 mb-12 shadow-lg shadow-yellow-900/20">
                        <div className="bg-black p-6 flex flex-col md:flex-row items-center justify-between gap-6">
                            <div className="flex items-center gap-4">
                                <div className="bg-primary/20 p-3 rounded-full">
                                    <Star className="w-8 h-8 text-primary animate-spin-slow" />
                                </div>
                                <div>
                                    <h3 className="text-primary font-bold uppercase tracking-wider text-sm">Banker of the Day</h3>
                                    <p className="text-2xl font-bold text-white">Bayern Munich vs Dortmund</p>
                                </div>
                            </div>
                            <div className="text-center">
                                <span className="block text-gray-400 text-xs uppercase font-bold">Market</span>
                                <span className="text-xl font-bold text-white">BTTS - Yes</span>
                            </div>
                            <div className="text-center">
                                <span className="block text-gray-400 text-xs uppercase font-bold">Odds</span>
                                <span className="text-xl font-bold text-primary">1.60</span>
                            </div>
                            <div className="bg-green-500/20 text-green-500 px-4 py-2 rounded font-bold uppercase border border-green-500/50 flex items-center gap-2">
                                <CheckCircle className="w-4 h-4" /> WON
                            </div>
                        </div>
                    </div>
                )}

                {/* List */}
                <div className="space-y-4">
                    {activeTab === "Free" ? (
                        FREE_TIPS.map(tip => <PredictionCard key={tip.id} tip={tip} />)
                    ) : (
                        <div className="relative">
                            {!isPremiumMember && (
                                <div className="absolute inset-0 z-10 backdrop-blur-md bg-black/50 flex flex-col items-center justify-center rounded-sm border border-white/10 p-8 text-center">
                                    <Lock className="w-16 h-16 text-primary mb-6" />
                                    <h3 className="text-3xl font-bold text-white mb-4 uppercase">Premium Access Only</h3>
                                    <p className="text-gray-300 mb-8 max-w-lg">
                                        Unlock our high-confidence predictions, accumulators, and investment tips. Join thousands of winners today.
                                    </p>
                                    <Link href="/membership" className="bg-primary text-black font-bold uppercase px-8 py-3 rounded hover:bg-yellow-500 transition-colors transform hover:scale-105">
                                        Get Premium Access
                                    </Link>
                                </div>
                            )}
                            <div className={clsx("space-y-4", !isPremiumMember && "opacity-20 pointer-events-none select-none filter blur-sm")}>
                                {PREMIUM_TIPS.map(tip => <PredictionCard key={tip.id} tip={tip} isPremium />)}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

function TabButton({ children, active, onClick, isPremium }: any) {
    return (
        <button
            onClick={onClick}
            className={clsx(
                "px-8 py-3 font-bold uppercase tracking-wide rounded-sm transition-all border-b-2",
                active ? (isPremium ? "border-primary text-primary bg-primary/10" : "border-white text-white bg-white/10") : "border-transparent text-gray-500 hover:text-white"
            )}
        >
            {children} {isPremium && <span className="ml-2 text-xs bg-primary text-black px-1.5 py-0.5 rounded align-top">PRO</span>}
        </button>
    )
}

function PredictionCard({ tip, isPremium }: any) {
    return (
        <div className={clsx(
            "bg-zinc-900 border p-6 rounded-sm flex flex-col md:flex-row items-center justify-between gap-6 transition-colors hover:bg-zinc-800",
            isPremium ? "border-primary/30" : "border-white/5"
        )}>
            <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                    <span className="bg-black text-xs font-bold px-2 py-1 rounded text-gray-400">{tip.time}</span>
                    {isPremium && <span className="bg-primary text-black text-xs font-bold px-2 py-1 rounded uppercase">Premium</span>}
                </div>
                <h3 className="text-xl font-bold text-white">{tip.match}</h3>
            </div>

            <div className="flex items-center gap-8 w-full md:w-auto justify-between md:justify-end">
                <div className="text-center">
                    <span className="block text-xs text-gray-500 uppercase font-bold mb-1">Selection</span>
                    <span className="text-lg font-bold text-white block">{tip.market}</span>
                </div>
                <div className="text-center">
                    <span className="block text-xs text-gray-500 uppercase font-bold mb-1">Odds</span>
                    <span className="text-xl font-bold text-primary block">{tip.odds.toFixed(2)}</span>
                </div>
                <div className="w-24 flex justify-end">
                    {tip.status === "PENDING" ? (
                        <div className="flex flex-col items-center">
                            <div className="w-12 h-12 rounded-full border-4 border-zinc-700 flex items-center justify-center relative">
                                <span className="text-xs font-bold text-white">{tip.confidence}%</span>
                                <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 36 36">
                                    <path className="text-primary" strokeDasharray={`${tip.confidence}, 100`} d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="4" />
                                </svg>
                            </div>
                        </div>
                    ) : (
                        <StatusBadge status={tip.status} />
                    )}
                </div>
            </div>
        </div>
    )
}

function StatusBadge({ status }: { status: string }) {
    if (status === "WON") return <span className="text-green-500 font-bold flex items-center gap-1 uppercase"><CheckCircle className="w-5 h-5" /> Won</span>;
    if (status === "LOST") return <span className="text-red-500 font-bold flex items-center gap-1 uppercase"><XCircle className="w-5 h-5" /> Lost</span>;
    return <span className="text-gray-500 font-bold flex items-center gap-1 uppercase"><AlertCircle className="w-5 h-5" /> Void</span>;
}
