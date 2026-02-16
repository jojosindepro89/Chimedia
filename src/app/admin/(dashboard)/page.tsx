import { prisma } from "@/lib/prisma";
import { Users, CreditCard, TrendingUp, Activity } from "lucide-react";
import Link from "next/link"; // Added Link import

export const dynamic = 'force-dynamic';

export default async function AdminDashboard() {
    const [userCount, subCount, revenueResult, pendingPredictions, recentOrders] = await Promise.all([
        prisma.user.count(),
        prisma.subscription.count({ where: { status: 'ACTIVE' } }),
        prisma.order.aggregate({
            _sum: { totalAmount: true },
            where: { status: { in: ['PAID', 'SHIPPED', 'DELIVERED', 'COMPLETED'] } }
        }),
        prisma.prediction.findMany({
            where: { status: 'PENDING' },
            take: 5,
            orderBy: { createdAt: 'desc' }
        }),
        prisma.order.findMany({
            take: 5,
            orderBy: { createdAt: 'desc' },
            include: { user: true, items: true }
        })
    ]);

    const totalRevenue = revenueResult._sum.totalAmount || 0;

    return (
        <div>
            <h1 className="text-3xl font-bold text-white uppercase mb-8">Dashboard Overview</h1>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                <StatCard title="Total Users" value={userCount.toLocaleString()} change="Active" icon={<Users className="w-6 h-6 text-primary" />} />
                <StatCard title="Active Subs" value={subCount.toLocaleString()} change="Live" icon={<CreditCard className="w-6 h-6 text-green-500" />} />
                <StatCard title="Total Revenue" value={`$${totalRevenue.toLocaleString()}`} change="Lifetime" icon={<TrendingUp className="w-6 h-6 text-blue-500" />} />
                <StatCard title="Pending Tips" value={pendingPredictions.length.toString()} change="Action Needed" icon={<Activity className="w-6 h-6 text-red-500" />} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Recent Orders */}
                <div className="bg-zinc-900 border border-white/10 rounded-sm p-6">
                    <h3 className="text-xl font-bold text-white uppercase mb-6 flex items-center justify-between">
                        Recent Orders
                        <Link href="/admin/orders" className="text-xs text-primary hover:underline">View All</Link>
                    </h3>
                    <div className="space-y-4">
                        {recentOrders.length === 0 ? (
                            <p className="text-gray-500 text-sm">No recent orders.</p>
                        ) : (
                            recentOrders.map((order) => (
                                <div key={order.id} className="flex items-center justify-between border-b border-white/5 pb-4 last:border-0 last:pb-0">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 bg-zinc-800 rounded-full flex items-center justify-center font-bold text-gray-500 text-xs">
                                            #{order.id.slice(-4).toUpperCase()}
                                        </div>
                                        <div>
                                            <span className="block text-white font-bold text-sm">
                                                {order.items.length} Item(s)
                                            </span>
                                            <span className="text-gray-500 text-xs">
                                                {order.user?.name || 'Guest'} • {new Date(order.createdAt).toLocaleDateString()}
                                            </span>
                                        </div>
                                    </div>
                                    <span className="text-primary font-bold">${order.totalAmount.toFixed(2)}</span>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                {/* Recent Predictions */}
                <div className="bg-zinc-900 border border-white/10 rounded-sm p-6">
                    <h3 className="text-xl font-bold text-white uppercase mb-6 flex items-center justify-between">
                        Pending Predictions
                        <Link href="/admin/predictions" className="text-xs text-primary hover:underline">Manage</Link>
                    </h3>
                    <div className="space-y-4">
                        {pendingPredictions.length === 0 ? (
                            <p className="text-gray-500 text-sm">No pending predictions.</p>
                        ) : (
                            pendingPredictions.map((pred) => (
                                <div key={pred.id} className="flex items-center justify-between border-b border-white/5 pb-4 last:border-0 last:pb-0">
                                    <div>
                                        <span className="block text-white font-bold text-sm">{pred.matchTitle}</span>
                                        <span className="text-gray-500 text-xs uppercase">{pred.market} • {pred.odds}</span>
                                    </div>
                                    <span className="bg-yellow-500/20 text-yellow-500 text-xs font-bold px-2 py-1 rounded uppercase">Pending</span>
                                </div>
                            ))
                        )}
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
