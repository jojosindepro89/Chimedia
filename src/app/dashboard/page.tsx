import DashboardSidebar from "@/components/dashboard/Sidebar";
import { Crown, Package, Clock, TrendingUp, AlertCircle } from "lucide-react";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";

export const dynamic = 'force-dynamic';

export default async function DashboardPage() {
    const session = await getSession();

    if (!session || !session.user || !session.user.email) {
        redirect('/login');
    }

    const DEMO_USER_EMAIL = session.user.email;

    const user = await prisma.user.findUnique({
        where: { email: DEMO_USER_EMAIL },
        include: {
            subscription: true,
            orders: {
                take: 5,
                orderBy: { createdAt: 'desc' },
                include: { items: { include: { product: true } } }
            }
        }
    });

    if (!user) {
        return <div className="p-8 text-white">User not found. Please log in again.</div>;
    }

    const sub = user.subscription;
    const orders = user.orders;
    const isPremium = sub?.status === 'ACTIVE';

    // Fetch latest premium codes if active subscription
    let premiumPredictions: any[] = [];
    if (isPremium) {
        premiumPredictions = await prisma.prediction.findMany({
            where: { isPremium: true },
            orderBy: { date: 'desc' },
            take: 3,
        });
    }

    return (
        <div className="flex min-h-screen bg-black text-white animate-fade-in-up">
            <DashboardSidebar />

            <div className="flex-1 p-8">
                <h1 className="text-3xl font-bold uppercase tracking-tight mb-8">
                    Welcome back, <span className="text-primary">{user.name || 'User'}</span>
                </h1>

                {/* Sub Card */}
                <div className="bg-gradient-to-r from-zinc-900 to-zinc-800 border border-white/10 rounded-lg p-8 mb-8 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-32 bg-primary/5 rounded-full blur-3xl -mr-16 -mt-16"></div>
                    <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
                        <div className="flex items-center gap-6">
                            <div className={`w-16 h-16 rounded-full flex items-center justify-center ${sub?.status === 'ACTIVE' ? 'bg-primary/20 text-primary' : 'bg-gray-800 text-gray-500'}`}>
                                <Crown className="w-8 h-8" />
                            </div>
                            <div>
                                <div className="text-sm text-gray-400 uppercase font-bold mb-1">Active Subscription</div>
                                <div className="text-2xl font-bold text-white">
                                    {sub ? sub.plan : 'Free Tier'}
                                </div>
                                <div className="text-sm text-gray-500 mt-1">
                                    {sub ? `Expires: ${new Date(sub.endDate).toLocaleDateString()}` : 'Upgrade to access premium tips'}
                                </div>
                            </div>
                        </div>
                        <Link href="/dashboard/subscription" className="bg-primary text-black font-bold uppercase px-6 py-3 rounded hover:bg-yellow-500 transition-colors shadow-lg shadow-primary/20">
                            {sub?.status === 'ACTIVE' ? 'Manage Plan' : 'Get Premium'}
                        </Link>
                    </div>
                </div>

                {/* Recent History */}
                <div className="mb-8">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl font-bold uppercase">Recent Order History</h2>
                        <Link href="/dashboard/orders" className="text-primary text-sm font-bold uppercase hover:underline">View All</Link>
                    </div>
                    <div className="bg-zinc-900 border border-white/10 rounded-lg overflow-hidden">
                        <table className="w-full text-left">
                            <thead className="bg-white/5 text-gray-400 text-sm uppercase">
                                <tr>
                                    <th className="p-4 font-medium">Order ID</th>
                                    <th className="p-4 font-medium">Date</th>
                                    <th className="p-4 font-medium">Items</th>
                                    <th className="p-4 font-medium">Total</th>
                                    <th className="p-4 font-medium">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {orders.length === 0 ? (
                                    <tr>
                                        <td colSpan={5} className="p-8 text-center text-gray-500">
                                            No recent orders.
                                        </td>
                                    </tr>
                                ) : (
                                    orders.map(order => (
                                        <tr key={order.id} className="hover:bg-white/5 transition-colors">
                                            <td className="p-4 font-mono text-sm text-gray-300">#{order.id.slice(-6).toUpperCase()}</td>
                                            <td className="p-4 text-sm">{new Date(order.createdAt).toLocaleDateString()}</td>
                                            <td className="p-4 text-sm text-gray-400">
                                                {order.items.length} item(s)
                                            </td>
                                            <td className="p-4 text-sm font-bold text-white">${order.totalAmount.toFixed(2)}</td>
                                            <td className="p-4">
                                                <span className={`text-xs font-bold px-2 py-1 rounded uppercase ${order.status === 'COMPLETED' ? 'bg-green-500/20 text-green-500' : 'bg-yellow-500/20 text-yellow-500'}`}>
                                                    {order.status}
                                                </span>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Betting Tips Recommendation */}
                <div>
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl font-bold uppercase">
                            {isPremium ? "Your Premium Daily Codes" : "Recommended Betting Tips"}
                        </h2>
                        <Link href="/predictions" className="text-primary text-sm font-bold uppercase hover:underline">View Predictions</Link>
                    </div>

                    {!isPremium ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {[1, 2, 3].map(i => (
                                <div key={i} className="bg-zinc-900 border border-white/10 p-6 rounded-lg hover:border-primary/50 transition-colors group relative overflow-hidden">
                                    <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px] z-10 flex flex-col items-center justify-center p-4 text-center">
                                        <Crown className="w-8 h-8 text-primary mb-2" />
                                        <p className="font-bold text-white text-sm uppercase">Premium Code Locked</p>
                                        <p className="text-xs text-gray-300 mt-1 mb-3">Upgrade to view today's best selections</p>
                                        <Link href="/membership" className="bg-primary text-black text-xs font-bold uppercase px-4 py-2 rounded">
                                            Unlock Now
                                        </Link>
                                    </div>
                                    <div className="flex justify-between items-start mb-4 opacity-50">
                                        <div className="bg-white/10 p-2 rounded text-primary">
                                            <TrendingUp className="w-5 h-5" />
                                        </div>
                                        <span className="bg-primary/20 text-primary text-xs font-bold px-2 py-1 rounded">High Win Rate</span>
                                    </div>
                                    <h3 className="text-lg font-bold text-white mb-2 opacity-50">Exclusive VIP Code</h3>
                                    <p className="text-sm text-gray-400 mb-4 opacity-50">High value selections carefully curated for premium members only.</p>
                                </div>
                            ))}
                        </div>
                    ) : premiumPredictions.length === 0 ? (
                        <div className="bg-zinc-900 border border-white/10 p-8 rounded-lg text-center">
                            <TrendingUp className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                            <h3 className="text-lg font-bold text-white mb-2 uppercase">No Codes Today Yet</h3>
                            <p className="text-gray-400 text-sm">Our experts are analyzing the matches. Please check back later for today's premium betting codes.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {premiumPredictions.map(pred => (
                                <div key={pred.id} className="bg-zinc-900 border border-primary/30 p-6 rounded-lg hover:border-primary transition-colors group relative">
                                    <div className="absolute -top-3 -right-3 bg-primary text-black text-xs font-bold px-3 py-1 rounded-full uppercase shadow-lg shadow-primary/20 transform rotate-12">
                                        New Code
                                    </div>
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="bg-primary/20 p-2 rounded text-primary">
                                            <TrendingUp className="w-5 h-5" />
                                        </div>
                                        {pred.isBanker && <span className="bg-primary/20 text-primary text-xs font-bold px-2 py-1 rounded">Banker of the day</span>}
                                    </div>
                                    <h3 className="text-lg font-bold text-white mb-2">{pred.matchTitle}</h3>
                                    <div className="bg-black/50 p-3 rounded border border-white/5 mb-4">
                                        <div className="text-xs text-gray-400 uppercase mb-1">{pred.market}</div>
                                        <div className="text-lg font-bold text-primary">{pred.selection} <span className="text-white">({pred.odds})</span></div>
                                    </div>
                                    {pred.analysis && <p className="text-sm text-gray-400 mb-4 line-clamp-2">{pred.analysis}</p>}
                                    <div className="flex justify-between items-center mt-4 pt-4 border-t border-white/10">
                                        <div className="flex items-center text-xs text-gray-500">
                                            <Clock className="w-3 h-3 mr-1" /> {new Date(pred.date).toLocaleDateString()}
                                        </div>
                                        <span className="text-xs font-bold text-white uppercase">{pred.league}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
}
