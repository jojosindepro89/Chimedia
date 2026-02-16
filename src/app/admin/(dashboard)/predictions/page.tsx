import Link from "next/link";
import { Plus, Edit, Trash2, Trophy } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { deletePrediction } from "@/app/actions";
import clsx from "clsx";

const predictions = await prisma.prediction.findMany({
    orderBy: { createdAt: 'desc' }
});

export default async function AdminPredictionsPage() {
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
                        {predictions.map((p) => (
                            <tr key={p.id} className="hover:bg-white/5 transition-colors">
                                <td className="p-4">
                                    <div className="flex items-center gap-3">
                                        <div className="bg-zinc-800 p-2 rounded">
                                            <Trophy className="w-4 h-4 text-primary" />
                                        </div>
                                        <div>
                                            <span className="font-bold text-white block">{p.matchTitle}</span>
                                            <span className="text-xs text-gray-500">{new Date(p.date).toLocaleString()}</span>
                                        </div>
                                    </div>
                                </td>
                                <td className="p-4 text-gray-400 text-sm">
                                    <div className="flex flex-col">
                                        <span className="font-bold">{p.market}</span>
                                        <span className="text-xs">{p.selection}</span>
                                    </div>
                                </td>
                                <td className="p-4 text-primary font-bold">{p.odds.toFixed(2)}</td>
                                <td className="p-4">
                                    <span className={clsx(
                                        "text-xs font-bold px-2 py-1 rounded uppercase",
                                        p.status === 'PENDING' ? "bg-yellow-500/10 text-yellow-500" :
                                            p.status === 'WON' ? "bg-green-500/10 text-green-500" :
                                                "bg-red-500/10 text-red-500"
                                    )}>{p.status}</span>
                                </td>
                                <td className="p-4 text-right">
                                    <div className="flex items-center justify-end gap-2">
                                        <Link href={`/admin/predictions/${p.id}/edit`} className="p-2 hover:bg-white/10 rounded text-blue-400 transition-colors">
                                            <Edit className="w-4 h-4" />
                                        </Link>
                                        <form action={deletePrediction.bind(null, p.id)}>
                                            <button className="p-2 hover:bg-white/10 rounded text-red-500 transition-colors">
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </form>
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
