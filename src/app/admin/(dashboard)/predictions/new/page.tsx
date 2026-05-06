"use client";

import Link from "next/link";
import { ArrowLeft, Save } from "lucide-react";
import { useActionState, useRef } from "react";
import { createPrediction } from "@/app/actions";
import dynamic from "next/dynamic";

// Dynamically import the editor to avoid SSR issues
const RichTextEditor = dynamic(() => import("@/components/admin/RichTextEditor"), { ssr: false });

const initialState = { message: '' };

export default function NewPredictionPage() {
    const [state, formAction, isPending] = useActionState(createPrediction, initialState);

    return (
        <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-4 mb-8">
                <Link href="/admin/predictions" className="bg-white/[0.06] hover:bg-white/10 p-2 rounded-lg text-white transition-colors">
                    <ArrowLeft className="w-5 h-5" />
                </Link>
                <div>
                    <h1 className="text-2xl font-black text-white uppercase tracking-tight">New Prediction</h1>
                    <p className="text-gray-500 text-sm">Create a new tip for the predictions page.</p>
                </div>
            </div>

            <form action={formAction} className="space-y-6">
                {/* Match Details */}
                <div className="bg-[#161616] border border-white/[0.08] rounded-xl p-6">
                    <h2 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-5">Match Details</h2>
                    <div className="grid grid-cols-1 gap-5">
                        <div>
                            <label className="block text-xs uppercase font-bold text-gray-500 mb-2 tracking-wider">Club / Match Name</label>
                            <input name="matchTitle" type="text" required
                                className="w-full bg-black/40 border border-white/[0.08] rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all placeholder-gray-700"
                                placeholder="e.g. Atl Madrid or Sporting CP" />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-5">
                        <div>
                            <label className="block text-xs uppercase font-bold text-gray-500 mb-2 tracking-wider">League / Competition</label>
                            <input name="league" type="text"
                                className="w-full bg-black/40 border border-white/[0.08] rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all placeholder-gray-700"
                                placeholder="e.g. Premier League" />
                        </div>
                        <div>
                            <label className="block text-xs uppercase font-bold text-gray-500 mb-2 tracking-wider">Logo URL (Optional)</label>
                            <input name="logoUrl" type="url"
                                className="w-full bg-black/40 border border-white/[0.08] rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all placeholder-gray-700"
                                placeholder="https://.../logo.png" />
                        </div>
                        <div>
                            <label className="block text-xs uppercase font-bold text-gray-500 mb-2 tracking-wider">Kickoff Time</label>
                            <input name="date" type="datetime-local" required
                                className="w-full bg-black/40 border border-white/[0.08] rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all" />
                        </div>
                    </div>
                </div>

                {/* Prediction Details */}
                <div className="bg-[#161616] border border-white/[0.08] rounded-xl p-6">
                    <h2 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-5">Prediction Details</h2>
                    <div className="grid grid-cols-1 gap-5">
                        <div>
                            <label className="block text-xs uppercase font-bold text-gray-500 mb-2 tracking-wider">Prediction</label>
                            <input name="market" type="text" required
                                className="w-full bg-black/40 border border-white/[0.08] rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all placeholder-gray-700"
                                placeholder="e.g. Win/Draw, Over 1.5, etc." />
                        </div>
                    </div>
                    <div className="mt-5">
                        <label className="block text-xs uppercase font-bold text-gray-500 mb-2 tracking-wider">Tier</label>
                        <select name="type"
                            className="bg-black/40 border border-white/[0.08] rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-primary/50 transition-all appearance-none w-full md:w-auto md:min-w-[200px]">
                            <option value="free">🆓 Free Tip</option>
                            <option value="premium">⭐ Premium (Pro Only)</option>
                            <option value="banker">🏆 Banker of the Day</option>
                        </select>
                    </div>
                </div>

                {/* Expert Analysis - Rich Text Editor */}
                <div className="bg-[#161616] border border-white/[0.08] rounded-xl p-6">
                    <h2 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Expert Analysis</h2>
                    <p className="text-gray-600 text-xs mb-5">Write your full prediction breakdown. Use the toolbar to format it like a Word document — headings, bold, lists, alignment, and more.</p>
                    <RichTextEditor name="analysis" placeholder="Write your detailed expert analysis here... Use headings, bold text, bullet points, and quotes to make it easy to read." />
                </div>

                {state?.message && (
                    <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-bold p-4 rounded-xl">
                        {state.message}
                    </div>
                )}

                <div className="flex items-center justify-end gap-4 pt-2">
                    <Link href="/admin/predictions" className="px-6 py-3 text-gray-500 font-bold uppercase text-sm hover:text-white transition-colors">
                        Cancel
                    </Link>
                    <button type="submit" disabled={isPending}
                        className="bg-primary text-black font-black uppercase px-8 py-3 rounded-xl hover:bg-yellow-400 transition-all shadow-lg shadow-primary/20 flex items-center gap-2 disabled:opacity-50 text-sm">
                        <Save className="w-4 h-4" />
                        {isPending ? "Saving..." : "Save Prediction"}
                    </button>
                </div>
            </form>
        </div>
    );
}
