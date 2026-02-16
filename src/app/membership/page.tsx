"use client";

import Link from "next/link";
import { Check, Star, Shield } from "lucide-react";
import clsx from "clsx";
import { initiateCheckout } from "@/app/payment-actions";

export default function MembershipPage() {
    return (
        <div className="bg-black min-h-screen pb-20">
            <div className="bg-zinc-900 border-b border-white/10 py-16">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-5xl font-bold uppercase tracking-tighter text-white mb-4">Join the <span className="text-primary">Inner Circle</span></h1>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        Unlock exclusive predictions, premium news, and live match analysis.
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4 mt-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
                    {/* Free Plan */}
                    <div className="bg-zinc-900 border border-white/10 rounded-sm p-8 flex flex-col hover:border-white/30 transition-colors">
                        <h3 className="text-2xl font-bold text-white uppercase mb-2">Free</h3>
                        <div className="text-4xl font-bold text-gray-400 mb-6">₦0<span className="text-lg font-normal">/mo</span></div>
                        <ul className="space-y-4 mb-8 flex-1">
                            <Benefit text="Daily Free Tips" />
                            <Benefit text="Basic Match News" />
                            <Benefit text="Live Scores" />
                            <Benefit text="Community Access" />
                        </ul>
                        <Link href="/register?plan=free" className="block text-center w-full border border-white/20 text-white font-bold uppercase py-3 rounded hover:bg-white hover:text-black transition-colors">
                            Get Started
                        </Link>
                    </div>

                    {/* Weekly Premium */}
                    <div className="bg-gradient-to-b from-zinc-800 to-black border border-primary/50 rounded-sm p-8 flex flex-col transform md:-translate-y-4 relative shadow-2xl shadow-primary/10">
                        <div className="absolute top-0 right-0 bg-primary text-black text-xs font-bold px-3 py-1 uppercase rounded-bl">Popular</div>
                        <h3 className="text-2xl font-bold text-primary uppercase mb-2">Weekly Pro</h3>
                        <div className="text-4xl font-bold text-white mb-6">₦1,200<span className="text-lg font-normal text-gray-400">/week</span></div>
                        <ul className="space-y-4 mb-8 flex-1">
                            <Benefit text="All Free Features" active />
                            <Benefit text="Daily Premium Banker" active />
                            <Benefit text="High Odds Accumulators" active />
                            <Benefit text="Live In-Play Alerts" active />
                            <Benefit text="Priority Support" active />
                        </ul>
                        <Link href="/register?plan=weekly" className="block text-center w-full bg-primary text-black font-bold uppercase py-3 rounded hover:bg-yellow-500 transition-colors shadow-lg shadow-primary/20">
                            Join Weekly
                        </Link>
                    </div>

                    {/* Monthly Premium */}
                    <div className="bg-zinc-900 border border-white/10 rounded-sm p-8 flex flex-col hover:border-white/30 transition-colors">
                        <h3 className="text-2xl font-bold text-white uppercase mb-2">Monthly Pro</h3>
                        <div className="text-4xl font-bold text-white mb-6">₦4,000<span className="text-lg font-normal text-gray-400">/mo</span></div>
                        <p className="text-xs text-gray-400 mb-6 uppercase tracking-wider font-bold text-green-500">Save 20%</p>
                        <ul className="space-y-4 mb-8 flex-1">
                            <Benefit text="All Weekly Features" />
                            <Benefit text="Long-term Strategy" />
                            <Benefit text="Exclusive Discord Access" />
                            <Benefit text="Merchandise Discount" />
                        </ul>
                        <Link href="/register?plan=monthly" className="block text-center w-full bg-white text-black font-bold uppercase py-3 rounded hover:bg-gray-200 transition-colors">
                            Join Monthly
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

function Benefit({ text, active = false }: { text: string; active?: boolean }) {
    return (
        <li className="flex items-center gap-3">
            <div className={clsx("rounded-full p-1", active ? "bg-primary text-black" : "bg-zinc-800 text-gray-400")}>
                <Check className="w-3 h-3" />
            </div>
            <span className={clsx("text-sm", active ? "text-white font-medium" : "text-gray-400")}>{text}</span>
        </li>
    )
}
