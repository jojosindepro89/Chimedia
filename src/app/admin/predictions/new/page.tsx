"use client";

import Link from "next/link";
import { ArrowLeft, Save } from "lucide-react";
import { useFormState } from "react-dom";
import { createPrediction } from "@/app/actions";

const initialState = {
    message: '',
}

export default function NewPredictionPage() {
    const [state, formAction] = useFormState(createPrediction, initialState);

    return (
        <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-4 mb-8">
                <Link href="/admin/predictions" className="bg-zinc-800 p-2 rounded-full text-white hover:bg-zinc-700 transition-colors">
                    <ArrowLeft className="w-5 h-5" />
                </Link>
                <h1 className="text-3xl font-bold text-white uppercase">New Prediction</h1>
            </div>

            <div className="bg-zinc-900 border border-white/10 rounded-sm p-8">
                <form action={formAction} className="space-y-8">

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Home Team */}
                        <div>
                            <label className="block text-xs uppercase font-bold text-gray-500 mb-2">Home Team</label>
                            <input name="homeTeam" type="text" className="w-full bg-black/50 border border-white/10 rounded px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors" placeholder="e.g. Manchester City" required />
                        </div>

                        {/* Away Team */}
                        <div>
                            <label className="block text-xs uppercase font-bold text-gray-500 mb-2">Away Team</label>
                            <input name="awayTeam" type="text" className="w-full bg-black/50 border border-white/10 rounded px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors" placeholder="e.g. Liverpool" required />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Market */}
                        <div>
                            <label className="block text-xs uppercase font-bold text-gray-500 mb-2">Market / Selection</label>
                            <input name="market" type="text" className="w-full bg-black/50 border border-white/10 rounded px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors" placeholder="e.g. Over 2.5 Goals" required />
                        </div>

                        {/* Odds */}
                        <div>
                            <label className="block text-xs uppercase font-bold text-gray-500 mb-2">Odds</label>
                            <input name="odds" type="number" step="0.01" className="w-full bg-black/50 border border-white/10 rounded px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors" placeholder="1.85" required />
                        </div>

                        {/* Confidence */}
                        <div>
                            <label className="block text-xs uppercase font-bold text-gray-500 mb-2">Confidence (%)</label>
                            <input name="confidence" type="number" max="100" className="w-full bg-black/50 border border-white/10 rounded px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors" placeholder="85" />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Date/Time */}
                        <div>
                            <label className="block text-xs uppercase font-bold text-gray-500 mb-2">Kickoff Time</label>
                            <input name="date" type="datetime-local" className="w-full bg-black/50 border border-white/10 rounded px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors" required />
                        </div>

                        {/* Type */}
                        <div>
                            <label className="block text-xs uppercase font-bold text-gray-500 mb-2">Tier</label>
                            <select name="type" className="w-full bg-black/50 border border-white/10 rounded px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors appearance-none">
                                <option value="free">Free Tip</option>
                                <option value="premium">Premium (Pro Only)</option>
                                <option value="banker">Banker of the Day</option>
                            </select>
                        </div>
                    </div>

                    {/* Analysis */}
                    <div>
                        <label className="block text-xs uppercase font-bold text-gray-500 mb-2">Expert Analysis (Optional)</label>
                        <textarea name="analysis" rows={5} className="w-full bg-black/50 border border-white/10 rounded px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors" placeholder="Why is this a good bet?"></textarea>
                    </div>

                    {state?.message && (
                        <p className="text-red-500 text-sm font-bold">{state.message}</p>
                    )}

                    {/* Actions */}
                    <div className="flex items-center justify-end gap-4 pt-4 border-t border-white/10">
                        <Link href="/admin/predictions" className="px-6 py-3 text-gray-400 font-bold uppercase hover:text-white transition-colors">
                            Cancel
                        </Link>
                        <button type="submit" className="bg-primary text-black font-bold uppercase px-8 py-3 rounded hover:bg-yellow-500 transition-colors flex items-center gap-2">
                            <Save className="w-4 h-4" /> Save Prediction
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
