import { MoreHorizontal, ShieldCheck } from "lucide-react";

export default function AdminMembersPage() {
    return (
        <div>
            <h1 className="text-3xl font-bold text-white uppercase mb-8">Manage Members</h1>

            <div className="bg-zinc-900 border border-white/10 rounded-sm overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-black/50 text-gray-400 text-xs uppercase font-bold border-b border-white/10">
                        <tr>
                            <th className="p-4">User</th>
                            <th className="p-4">Role</th>
                            <th className="p-4">Plan</th>
                            <th className="p-4">joined</th>
                            <th className="p-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        {[1, 2, 3, 4, 5].map((i) => (
                            <tr key={i} className="hover:bg-white/5 transition-colors">
                                <td className="p-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center text-xs font-bold text-primary">JD</div>
                                        <div>
                                            <span className="font-bold text-white block">Member Name {i}</span>
                                            <span className="text-xs text-gray-500">member{i}@example.com</span>
                                        </div>
                                    </div>
                                </td>
                                <td className="p-4 text-sm text-gray-400">User</td>
                                <td className="p-4">
                                    <span className="bg-primary/10 text-primary text-xs font-bold px-2 py-1 rounded uppercase">Premium Monthly</span>
                                </td>
                                <td className="p-4 text-gray-500 text-sm">2 days ago</td>
                                <td className="p-4 text-right">
                                    <button className="p-2 hover:bg-white/10 rounded text-gray-400 transition-colors">
                                        <MoreHorizontal className="w-5 h-5" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
