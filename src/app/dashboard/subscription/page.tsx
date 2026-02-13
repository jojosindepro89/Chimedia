import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { ArrowLeft, Crown, CheckCircle, AlertCircle } from "lucide-react";

// For demo purposes, we are fetching the specific demo user
const DEMO_USER_EMAIL = 'user@example.com';

export const dynamic = 'force-dynamic';

export default async function SubscriptionPage() {
    const user = await prisma.user.findUnique({
        where: { email: DEMO_USER_EMAIL },
        include: { subscription: true }
    });

    if (!user) {
        return <div className="p-8 text-white">User not found. Please run the demo seed script.</div>;
    }

    const sub = user.subscription;

    return (
        <div className="flex min-h-screen bg-black text-white">
            <div className="flex-1 p-8">
                <Link href="/dashboard" className="flex items-center text-gray-400 hover:text-white mb-6 transition-colors">
                    <ArrowLeft className="w-4 h-4 mr-2" /> Back to Dashboard
                </Link>

                <h1 className="text-3xl font-bold uppercase tracking-tight mb-8">My Subscription</h1>

                <div className="max-w-2xl">
                    <div className="bg-zinc-900 border border-white/10 rounded-lg p-8 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-32 bg-primary/5 rounded-full blur-3xl -mr-16 -mt-16"></div>

                        <div className="relative z-10">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center text-primary">
                                    <Crown className="w-6 h-6" />
                                </div>
                                <div>
                                    <h2 className="text-xl font-bold text-white">
                                        {sub ? sub.plan : 'Free Tier'}
                                    </h2>
                                    <div className="flex items-center gap-2 mt-1">
                                        {sub && sub.status === 'ACTIVE' ? (
                                            <span className="flex items-center text-green-500 text-sm font-bold uppercase">
                                                <CheckCircle className="w-4 h-4 mr-1" /> Active
                                            </span>
                                        ) : (
                                            <span className="flex items-center text-gray-500 text-sm font-bold uppercase">
                                                <AlertCircle className="w-4 h-4 mr-1" /> Inactive
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4 border-t border-white/10 pt-6">
                                <div className="flex justify-between">
                                    <span className="text-gray-400">Start Date</span>
                                    <span className="font-mono">{sub ? new Date(sub.startDate).toLocaleDateString() : 'N/A'}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-400">End Date</span>
                                    <span className="font-mono">{sub ? new Date(sub.endDate).toLocaleDateString() : 'N/A'}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-400">Auto-Renewal</span>
                                    <span className="font-mono text-primary">Enabled</span>
                                </div>
                            </div>

                            <div className="mt-8 flex gap-4">
                                <button className="flex-1 bg-primary text-black font-bold uppercase py-3 rounded hover:bg-yellow-500 transition-colors">
                                    {sub && sub.status === 'ACTIVE' ? 'Extend Plan' : 'Upgrade to Premium'}
                                </button>
                                {sub && sub.status === 'ACTIVE' && (
                                    <button className="flex-1 bg-zinc-800 text-white font-bold uppercase py-3 rounded hover:bg-zinc-700 transition-colors border border-white/10">
                                        Cancel Plan
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
