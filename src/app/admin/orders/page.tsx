import { Eye, Package } from "lucide-react";

export default function AdminOrdersPage() {
    return (
        <div>
            <h1 className="text-3xl font-bold text-white uppercase mb-8">Manage Orders</h1>

            <div className="bg-zinc-900 border border-white/10 rounded-sm overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-black/50 text-gray-400 text-xs uppercase font-bold border-b border-white/10">
                        <tr>
                            <th className="p-4">Order ID</th>
                            <th className="p-4">Customer</th>
                            <th className="p-4">Status</th>
                            <th className="p-4">Total</th>
                            <th className="p-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                        {[1, 2, 3, 4, 5].map((i) => (
                            <tr key={i} className="hover:bg-white/5 transition-colors">
                                <td className="p-4 font-mono text-gray-400 text-sm">#ORD-{1000 + i}</td>
                                <td className="p-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 bg-zinc-800 rounded-full flex items-center justify-center text-xs font-bold text-gray-500">JD</div>
                                        <span className="font-medium text-white">John Doe</span>
                                    </div>
                                </td>
                                <td className="p-4">
                                    <span className="bg-green-500/10 text-green-500 text-xs font-bold px-2 py-1 rounded uppercase">Completed</span>
                                </td>
                                <td className="p-4 text-white font-bold">$129.98</td>
                                <td className="p-4 text-right">
                                    <button className="flex items-center gap-1 text-xs font-bold uppercase text-gray-400 hover:text-white transition-colors ml-auto">
                                        <Eye className="w-4 h-4" /> View
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
