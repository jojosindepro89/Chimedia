import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { ArrowLeft, Package, Search } from "lucide-react";

const DEMO_USER_EMAIL = 'user@example.com';

export const dynamic = 'force-dynamic';

export default async function OrdersPage() {
    const user = await prisma.user.findUnique({
        where: { email: DEMO_USER_EMAIL },
        include: {
            orders: {
                include: { items: { include: { product: true } } },
                orderBy: { createdAt: 'desc' }
            }
        }
    });

    if (!user) {
        return <div className="p-8 text-white">User not found. Please run the demo seed script.</div>;
    }

    const orders = user.orders;

    return (
        <div className="flex min-h-screen bg-black text-white">
            <div className="flex-1 p-8">
                <div className="flex items-center justify-between mb-8">
                    <Link href="/dashboard" className="flex items-center text-gray-400 hover:text-white transition-colors">
                        <ArrowLeft className="w-4 h-4 mr-2" /> Back to Dashboard
                    </Link>
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                        <input type="text" placeholder="Search orders..." className="bg-zinc-900 border border-white/10 rounded-full pl-10 pr-4 py-2 text-sm text-white focus:outline-none focus:border-primary" />
                    </div>
                </div>

                <h1 className="text-3xl font-bold uppercase tracking-tight mb-8">Order History</h1>

                <div className="bg-zinc-900 border border-white/10 rounded-lg overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-black/50 text-gray-400 text-xs uppercase font-bold border-b border-white/10">
                                <tr>
                                    <th className="p-4">Order ID</th>
                                    <th className="p-4">Date</th>
                                    <th className="p-4">Items</th>
                                    <th className="p-4">Total</th>
                                    <th className="p-4">Status</th>
                                    <th className="p-4 text-right">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {orders.length === 0 ? (
                                    <tr>
                                        <td colSpan={6} className="p-8 text-center text-gray-500">
                                            No orders found. <Link href="/shop" className="text-primary hover:underline">Start Shopping</Link>
                                        </td>
                                    </tr>
                                ) : (
                                    orders.map((order) => (
                                        <tr key={order.id} className="hover:bg-white/5 transition-colors">
                                            <td className="p-4 font-mono text-sm text-gray-300">#{order.id.slice(-6).toUpperCase()}</td>
                                            <td className="p-4 text-sm text-gray-500">{new Date(order.createdAt).toLocaleDateString()}</td>
                                            <td className="p-4 text-sm">
                                                {order.items.map(item => (
                                                    <div key={item.id} className="text-white">
                                                        {item.quantity}x {item.product.name}
                                                    </div>
                                                ))}
                                            </td>
                                            <td className="p-4 text-sm font-bold text-white">${order.totalAmount.toFixed(2)}</td>
                                            <td className="p-4">
                                                <span className={`text-xs font-bold uppercase px-2 py-1 rounded ${order.status === 'COMPLETED' ? 'bg-green-500/20 text-green-500' :
                                                        order.status === 'PENDING' ? 'bg-yellow-500/20 text-yellow-500' :
                                                            'bg-gray-800 text-gray-400'
                                                    }`}>
                                                    {order.status}
                                                </span>
                                            </td>
                                            <td className="p-4 text-right">
                                                <button className="text-xs font-bold uppercase text-primary hover:underline">
                                                    View Details
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
