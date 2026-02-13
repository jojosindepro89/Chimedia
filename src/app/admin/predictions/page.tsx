import Link from "next/link";
import { Plus, Edit, Trash2, Trophy } from "lucide-react";

export default function AdminPredictionsPage() {
    return (
        <div>
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-3xl font-bold text-white uppercase">Manage Predictions</h1>
                <Link href="/admin/predictions/new" className="bg-primary text-black font-bold uppercase px-4 py-2 rounded-sm flex items-center gap-2 hover:bg-yellow-500 transition-colors">
                    <Plus className="w-4 h-4" /> New Prediction
                </Link>
            </div>

            <div className="bg-zinc-900 border border-white/10 rounded-sm overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-black/50 text-gray-400 text-xs uppercase font-bold border-b border-white/10">
                        <tr>
                            <th className="p-4">Match</th>
                            <th className="p-4">Market</th>
                            <th className="p-4">Odds</th>
                            <th className="p-4">Status</th>
                            <th className="p-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        {[1, 2, 3].map((i) => (
                            <tr key={i} className="hover:bg-white/5 transition-colors">
                                <td className="p-4">
                                    <div className="flex items-center gap-3">
                                        <div className="bg-zinc-800 p-2 rounded">
                                            <Trophy className="w-4 h-4 text-primary" />
                                        </div>
                                        <div>
                                            <span className="font-bold text-white block">Team A vs Team B</span>
                                            <span className="text-xs text-gray-500">Today, 20:00</span>
                                        </div>
                                    </div>
                                </td>
                                <td className="p-4 text-gray-400 text-sm">Over 2.5 Goals</td>
                                <td className="p-4 text-primary font-bold">1.85</td>
                                <td className="p-4">
                                    <span className="bg-yellow-500/10 text-yellow-500 text-xs font-bold px-2 py-1 rounded uppercase">Pending</span>
                                </td>
                                <td className="p-4 text-right">
                                    <div className="flex items-center justify-end gap-2">
                                        <button className="p-2 hover:bg-white/10 rounded text-blue-400 transition-colors">
                                            <Edit className="w-4 h-4" />
                                        </button>
                                        <button className="p-2 hover:bg-white/10 rounded text-red-500 transition-colors">
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
