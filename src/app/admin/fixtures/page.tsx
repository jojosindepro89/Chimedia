import { Calendar, RefreshCw } from "lucide-react";

export default function AdminFixturesPage() {
    return (
        <div>
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-3xl font-bold text-white uppercase">Manage Fixtures</h1>
                <button className="bg-zinc-800 text-white font-bold uppercase px-4 py-2 rounded-sm flex items-center gap-2 hover:bg-zinc-700 transition-colors">
                    <RefreshCw className="w-4 h-4" /> Sync from API
                </button>
            </div>

            <div className="bg-zinc-900 border border-white/10 rounded-sm overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-black/50 text-gray-400 text-xs uppercase font-bold border-b border-white/10">
                        <tr>
                            <th className="p-4">Date/Time</th>
                            <th className="p-4">Fixture</th>
                            <th className="p-4">League</th>
                            <th className="p-4">Status</th>
                            <th className="p-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        {[1, 2, 3, 4].map(i => (
                            <tr key={i} className="hover:bg-white/5 transition-colors">
                                <td className="p-4 text-gray-400 text-sm flex items-center gap-2">
                                    <Calendar className="w-4 h-4" /> 20:45
                                </td>
                                <td className="p-4 font-bold text-white">Man Utd vs Chelsea</td>
                                <td className="p-4 text-sm text-gray-400">Premier League</td>
                                <td className="p-4"><span className="text-gray-500 font-bold text-xs uppercase">Upcoming</span></td>
                                <td className="p-4 text-right">
                                    <button className="text-primary hover:underline text-xs font-bold uppercase">Edit Details</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
