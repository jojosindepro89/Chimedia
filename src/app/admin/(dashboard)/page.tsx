import { prisma } from "@/lib/prisma";
import { Users, CreditCard, TrendingUp, Activity, ArrowUpRight, Trophy, Package, Clock } from "lucide-react";
import Link from "next/link";
import { verifyAdminSession } from "@/lib/session";

import { redirect } from "next/navigation";

export const dynamic = 'force-dynamic';

export default async function AdminDashboard() {
    const session = await verifyAdminSession();
    if (!session) {
        redirect('/admin/login');
    }
    const adminName = (session.user as any)?.name || "Admin";

    const [userCount, subCount, revenueResult, pendingPredictions, recentOrders, postCount, productCount] = await Promise.all([
        prisma.user.count(),
        prisma.subscription.count({ where: { status: 'ACTIVE' } }),
        prisma.order.aggregate({
            _sum: { totalAmount: true },
            where: { status: { in: ['PAID', 'SHIPPED', 'DELIVERED', 'COMPLETED'] } }
        }),
        prisma.prediction.findMany({
            where: { status: 'PENDING' },
            take: 6,
            orderBy: { createdAt: 'desc' }
        }),
        prisma.order.findMany({
            take: 5,
            orderBy: { createdAt: 'desc' },
            include: { user: { select: { name: true, email: true } }, items: true }
        }),
        prisma.post.count({ where: { published: true } }),
        prisma.product.count(),
    ]);

    const totalRevenue = revenueResult._sum.totalAmount || 0;
    const now = new Date();
    const hour = now.getHours();
    const greeting = hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex items-start justify-between">
                <div>
                    <p className="text-gray-500 text-sm font-medium mb-1">{greeting} 👋</p>
                    <h1 className="text-3xl font-black text-white tracking-tight">
                        Welcome back, <span className="text-primary">{adminName}</span>
                    </h1>
                    <p className="text-gray-500 text-sm mt-1">
                        {now.toLocaleDateString('en-GB', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                    </p>
                </div>
                <Link
                    href="/admin/predictions/new"
                    className="flex items-center gap-2 bg-primary text-black font-bold uppercase text-xs px-4 py-2.5 rounded-lg hover:bg-yellow-400 transition-all shadow-lg shadow-primary/20 hover:shadow-primary/40 hover:-translate-y-0.5"
                >
                    <Trophy size={14} />
                    New Prediction
                </Link>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard
                    title="Total Users"
                    value={userCount.toLocaleString()}
                    sub="Registered accounts"
                    icon={<Users className="w-5 h-5" />}
                    color="blue"
                    href="/admin/members"
                />
                <StatCard
                    title="Active Subs"
                    value={subCount.toLocaleString()}
                    sub="Premium members"
                    icon={<CreditCard className="w-5 h-5" />}
                    color="green"
                    href="/admin/members"
                />
                <StatCard
                    title="Revenue"
                    value={`₦${totalRevenue.toLocaleString()}`}
                    sub="Total lifetime"
                    icon={<TrendingUp className="w-5 h-5" />}
                    color="yellow"
                    href="/admin/orders"
                />
                <StatCard
                    title="Pending Tips"
                    value={pendingPredictions.length.toString()}
                    sub="Awaiting result"
                    icon={<Activity className="w-5 h-5" />}
                    color="red"
                    href="/admin/predictions"
                />
            </div>

            {/* Secondary stats */}
            <div className="grid grid-cols-2 gap-4">
                <div className="bg-[#161616] border border-white/[0.06] rounded-xl p-5 flex items-center gap-4">
                    <div className="w-10 h-10 bg-purple-500/10 rounded-lg flex items-center justify-center shrink-0">
                        <Package className="w-5 h-5 text-purple-400" />
                    </div>
                    <div>
                        <p className="text-gray-500 text-xs uppercase font-bold tracking-wider mb-0.5">Shop Products</p>
                        <p className="text-2xl font-black text-white">{productCount}</p>
                    </div>
                    <Link href="/admin/shop" className="ml-auto text-gray-600 hover:text-white transition-colors">
                        <ArrowUpRight size={18} />
                    </Link>
                </div>
                <div className="bg-[#161616] border border-white/[0.06] rounded-xl p-5 flex items-center gap-4">
                    <div className="w-10 h-10 bg-cyan-500/10 rounded-lg flex items-center justify-center shrink-0">
                        <Activity className="w-5 h-5 text-cyan-400" />
                    </div>
                    <div>
                        <p className="text-gray-500 text-xs uppercase font-bold tracking-wider mb-0.5">Published Posts</p>
                        <p className="text-2xl font-black text-white">{postCount}</p>
                    </div>
                    <Link href="/admin/posts" className="ml-auto text-gray-600 hover:text-white transition-colors">
                        <ArrowUpRight size={18} />
                    </Link>
                </div>
            </div>

            {/* Main content grid */}
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                {/* Recent Orders — wider */}
                <div className="lg:col-span-3 bg-[#161616] border border-white/[0.06] rounded-xl overflow-hidden">
                    <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.06]">
                        <h3 className="font-bold text-white uppercase text-sm tracking-wider">Recent Orders</h3>
                        <Link href="/admin/orders" className="text-primary text-xs font-bold uppercase hover:underline flex items-center gap-1">
                            View All <ArrowUpRight size={12} />
                        </Link>
                    </div>
                    <div className="divide-y divide-white/[0.04]">
                        {recentOrders.length === 0 ? (
                            <div className="px-6 py-10 text-center text-gray-600 text-sm">No orders yet.</div>
                        ) : (
                            recentOrders.map((order) => (
                                <div key={order.id} className="flex items-center gap-4 px-6 py-4 hover:bg-white/[0.02] transition-colors">
                                    <div className="w-9 h-9 bg-white/[0.06] rounded-lg flex items-center justify-center font-mono text-[11px] text-gray-400 font-bold shrink-0">
                                        #{order.id.slice(-3).toUpperCase()}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-white font-bold text-sm truncate">
                                            {order.user?.name || order.user?.email || "Guest"}
                                        </p>
                                        <p className="text-gray-500 text-xs">
                                            {order.items.length} item{order.items.length !== 1 ? "s" : ""} · {new Date(order.createdAt).toLocaleDateString('en-GB')}
                                        </p>
                                    </div>
                                    <div className="text-right shrink-0">
                                        <p className="text-primary font-bold text-sm">₦{order.totalAmount.toLocaleString()}</p>
                                        <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${
                                            order.status === 'PAID' || order.status === 'COMPLETED'
                                                ? 'bg-green-500/10 text-green-500'
                                                : 'bg-yellow-500/10 text-yellow-500'
                                        }`}>
                                            {order.status}
                                        </span>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                {/* Pending Predictions — narrower */}
                <div className="lg:col-span-2 bg-[#161616] border border-white/[0.06] rounded-xl overflow-hidden">
                    <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.06]">
                        <h3 className="font-bold text-white uppercase text-sm tracking-wider">Pending Tips</h3>
                        <Link href="/admin/predictions" className="text-primary text-xs font-bold uppercase hover:underline flex items-center gap-1">
                            Manage <ArrowUpRight size={12} />
                        </Link>
                    </div>
                    <div className="divide-y divide-white/[0.04]">
                        {pendingPredictions.length === 0 ? (
                            <div className="px-6 py-10 text-center text-gray-600 text-sm">No pending tips.</div>
                        ) : (
                            pendingPredictions.map((pred) => (
                                <div key={pred.id} className="px-6 py-4 hover:bg-white/[0.02] transition-colors">
                                    <div className="flex items-start justify-between gap-3">
                                        <div className="min-w-0 flex-1">
                                            <p className="text-white font-bold text-sm truncate">{pred.matchTitle}</p>
                                            <p className="text-gray-500 text-xs mt-0.5 truncate">{pred.market}</p>
                                        </div>
                                        <div className="shrink-0 text-right">
                                            <p className="text-primary font-black text-sm">{pred.odds.toFixed(2)}</p>
                                            {pred.isPremium && (
                                                <span className="text-[10px] bg-primary/10 text-primary px-1.5 py-0.5 rounded font-bold uppercase">PRO</span>
                                            )}
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2 mt-2">
                                        <Clock size={11} className="text-gray-600" />
                                        <span className="text-gray-600 text-[11px]">
                                            {new Date(pred.date).toLocaleDateString('en-GB', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                                        </span>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

interface StatCardProps {
    title: string;
    value: string;
    sub: string;
    icon: React.ReactNode;
    color: "blue" | "green" | "yellow" | "red";
    href: string;
}

const colorMap = {
    blue: { bg: "bg-blue-500/10", text: "text-blue-400", ring: "ring-blue-500/20" },
    green: { bg: "bg-green-500/10", text: "text-green-400", ring: "ring-green-500/20" },
    yellow: { bg: "bg-primary/10", text: "text-primary", ring: "ring-primary/20" },
    red: { bg: "bg-red-500/10", text: "text-red-400", ring: "ring-red-500/20" },
};

function StatCard({ title, value, sub, icon, color, href }: StatCardProps) {
    const c = colorMap[color];
    return (
        <Link href={href} className="bg-[#161616] border border-white/[0.06] rounded-xl p-5 hover:border-white/[0.12] hover:bg-[#1a1a1a] transition-all group">
            <div className="flex items-center justify-between mb-4">
                <div className={`w-10 h-10 ${c.bg} rounded-lg flex items-center justify-center ${c.text} ring-1 ${c.ring}`}>
                    {icon}
                </div>
                <ArrowUpRight size={16} className="text-gray-700 group-hover:text-gray-400 transition-colors" />
            </div>
            <p className="text-3xl font-black text-white mb-1">{value}</p>
            <p className="text-gray-500 text-xs uppercase font-bold tracking-wider">{title}</p>
            <p className="text-gray-600 text-[11px] mt-0.5">{sub}</p>
        </Link>
    );
}
