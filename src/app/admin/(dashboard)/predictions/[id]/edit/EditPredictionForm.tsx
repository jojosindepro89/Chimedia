"use client";

import Link from "next/link";
import { ArrowLeft, Save } from "lucide-react";
import { useActionState } from "react";
import { updatePrediction } from "@/app/actions";

const initialState = { message: '' };

export default function EditPredictionForm({ prediction }: { prediction: any }) {
    const [state, formAction, isPending] = useActionState(updatePrediction.bind(null, prediction.id), initialState);

    return (
        <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-4 mb-8">
                <Link href="/admin/predictions" className="bg-white/[0.06] hover:bg-white/10 p-2 rounded-lg text-white transition-colors">
                    <ArrowLeft className="w-5 h-5" />
                </Link>
                <div>
                    <h1 className="text-2xl font-black text-white uppercase tracking-tight">Edit Prediction</h1>
                    <p className="text-gray-500 text-sm">Update the prediction details.</p>
                </div>
            </div>

            <form action={formAction} className="space-y-6">
                {/* Match Details */}
                <div className="bg-[#161616] border border-white/[0.08] rounded-xl p-6">
                    <h2 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-5">Match Details</h2>
                    <div className="grid grid-cols-1 gap-5">
                        <div>
                            <label className="block text-xs uppercase font-bold text-gray-500 mb-2 tracking-wider">Club / Match Name</label>
                            <input name="matchTitle" type="text" required defaultValue={prediction.matchTitle}
                                className="w-full bg-black/40 border border-white/[0.08] rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all placeholder-gray-700" />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5">
                        <div>
                            <label className="block text-xs uppercase font-bold text-gray-500 mb-2 tracking-wider">League / Competition</label>
                            <input name="league" type="text" defaultValue={prediction.league || ''}
                                className="w-full bg-black/40 border border-white/[0.08] rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all placeholder-gray-700" />
                        </div>
                        <div>
                            <label className="block text-xs uppercase font-bold text-gray-500 mb-2 tracking-wider">Logo URL (Optional)</label>
                            <input name="logoUrl" type="url" defaultValue={prediction.resultScore || ''}
                                className="w-full bg-black/40 border border-white/[0.08] rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all placeholder-gray-700" />
                        </div>
                    </div>
                </div>

                {/* Prediction Details */}
                <div className="bg-[#161616] border border-white/[0.08] rounded-xl p-6">
                    <h2 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-5">Prediction Details</h2>
                    <div className="grid grid-cols-1 gap-5">
                        <div>
                            <label className="block text-xs uppercase font-bold text-gray-500 mb-2 tracking-wider">Prediction</label>
                            <input name="market" type="text" required defaultValue={prediction.market}
                                className="w-full bg-black/40 border border-white/[0.08] rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all placeholder-gray-700" />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5">
                        <div>
                            <label className="block text-xs uppercase font-bold text-gray-500 mb-2 tracking-wider">Tier</label>
                            <select name="type" defaultValue={prediction.isBanker ? 'banker' : prediction.isPremium ? 'premium' : 'free'}
                                className="bg-black/40 border border-white/[0.08] rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-primary/50 transition-all appearance-none w-full">
                                <option value="free">🆓 Free Tip</option>
                                <option value="premium">⭐ Premium (Pro Only)</option>
                                <option value="banker">🏆 Banker of the Day</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-xs uppercase font-bold text-gray-500 mb-2 tracking-wider">Status</label>
                            <select name="status" defaultValue={prediction.status}
                                className="bg-black/40 border border-white/[0.08] rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-primary/50 transition-all appearance-none w-full">
                                <option value="PENDING">⏳ PENDING</option>
                                <option value="WON">✅ WON</option>
                                <option value="LOST">❌ LOST</option>
                                <option value="VOID">➖ VOID</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Image Upload for Betting Code */}
                <div className="bg-[#161616] border border-white/[0.08] rounded-xl p-6">
                    <h2 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Betting Code Image (Optional)</h2>
                    <p className="text-gray-600 text-xs mb-5">Upload a new screenshot to replace the existing one.</p>
                    {prediction.codeImage && (
                        <div className="mb-4">
                            <p className="text-xs text-gray-500 mb-2">Current Image:</p>
                            <img src={prediction.codeImage} alt="Current code" className="h-32 object-contain rounded" />
                        </div>
                    )}
                    <input name="codeImage" type="file" accept="image/*"
                        className="w-full bg-black/40 border border-white/[0.08] rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20" />
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
                        {isPending ? "Saving..." : "Save Changes"}
                    </button>
                </div>
            </form>
        </div>
    );
}
