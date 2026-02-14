import { Users, CreditCard, TrendingUp, Activity } from "lucide-react";

export default function AdminDashboard() {
    return (
        <div>
            <h1 className="text-3xl font-bold text-white uppercase mb-8">Dashboard Overview</h1>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                <StatCard title="Total Users" value="12,450" change="+12%" icon={<Users className="w-6 h-6 text-primary" />} />
                <StatCard title="Active Subs" value="3,200" change="+5%" icon={<CreditCard className="w-6 h-6 text-green-500" />} />
                <StatCard title="Revenue (Mo)" value="$45,200" change="+18%" icon={<TrendingUp className="w-6 h-6 text-blue-500" />} />
                <StatCard title="Live Matches" value="8" change="Active" icon={<Activity className="w-6 h-6 text-red-500" />} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Recent Orders */}
                <div className="bg-zinc-900 border border-white/10 rounded-sm p-6">
                    <h3 className="text-xl font-bold text-white uppercase mb-6 flex items-center justify-between">
                        Recent Orders
                        <button className="text-xs text-primary hover:underline">View All</button>
                    </h3>
                    <div className="space-y-4">
                        {[1, 2, 3, 4, 5].map((i) => (
                            <div key={i} className="flex items-center justify-between border-b border-white/5 pb-4 last:border-0 last:pb-0">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 bg-zinc-800 rounded-full flex items-center justify-center font-bold text-gray-500">#{1000 + i}</div>
                                    <div>
                                        <span className="block text-white font-bold">Premium Jersey</span>
                                        <span className="text-gray-500 text-xs">James Doe • 2 mins ago</span>
                                    </div>
                                </div>
                                <span className="text-primary font-bold">$89.99</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Recent Predictions */}
                <div className="bg-zinc-900 border border-white/10 rounded-sm p-6">
                    <h3 className="text-xl font-bold text-white uppercase mb-6 flex items-center justify-between">
                        Pending Predictions
                        <button className="text-xs text-primary hover:underline">Manage</button>
                    </h3>
                    <div className="space-y-4">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="flex items-center justify-between border-b border-white/5 pb-4 last:border-0 last:pb-0">
                                <div>
                                    <span className="block text-white font-bold text-sm">Man City vs Liverpool</span>
                                    <span className="text-gray-500 text-xs uppercase">Over 2.5 Goals • 1.85</span>
                                </div>
                                <span className="bg-yellow-500/20 text-yellow-500 text-xs font-bold px-2 py-1 rounded uppercase">Pending</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

function StatCard({ title, value, change, icon }: any) {
    return (
        <div className="bg-zinc-900 border border-white/10 p-6 rounded-sm hover:border-white/30 transition-colors">
            <div className="flex items-center justify-between mb-4">
                <span className="text-gray-400 text-xs font-bold uppercase">{title}</span>
                {icon}
            </div>
            <div className="text-3xl font-bold text-white mb-2">{value}</div>
            <span className="text-green-500 text-xs font-bold bg-green-500/10 px-2 py-1 rounded">{change}</span>
        </div>
    )
}
