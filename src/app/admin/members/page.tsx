import Link from "next/link";
import { User, Trash2, Ban, CheckCircle, Search, MoreVertical } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { deleteUser, toggleUserRole } from "@/app/actions";

export const dynamic = 'force-dynamic';

export default async function AdminMembersPage() {
    const users = await prisma.user.findMany({
        orderBy: { createdAt: 'desc' },
        include: { subscription: true }
    });

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-white uppercase tracking-tight">Members</h1>
                    <p className="text-gray-400 mt-1">Manage users and subscriptions</p>
                </div>
            </div>

            {/* Filters */}
            <div className="flex flex-col md:flex-row gap-4 bg-zinc-900/50 p-4 rounded-sm border border-white/5">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                    <input type="text" placeholder="Search members..." className="w-full bg-black border border-white/10 rounded px-10 py-2 text-white focus:outline-none focus:border-primary transition-colors" />
                </div>
            </div>

            {/* Members Table */}
            <div className="bg-zinc-900 border border-white/10 rounded-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="bg-black/50 border-b border-white/10 text-left">
                                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">User</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Role</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Subscription</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Status</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {users.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                                        No members found.
                                    </td>
                                </tr>
                            ) : (
                                users.map((user) => (
                                    <tr key={user.id} className="hover:bg-white/5 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 bg-zinc-800 rounded-full overflow-hidden flex items-center justify-center">
                                                    {user.image ? (
                                                        <img src={user.image} alt="" className="w-full h-full object-cover" />
                                                    ) : (
                                                        <User className="w-5 h-5 text-gray-500" />
                                                    )}
                                                </div>
                                                <div>
                                                    <div className="font-bold text-white">{user.name || 'Unknown'}</div>
                                                    <div className="text-xs text-gray-500">{user.email}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`text-xs font-bold uppercase px-2 py-1 rounded ${user.role === 'ADMIN' ? 'bg-primary/20 text-primary' : 'bg-gray-800 text-gray-400'}`}>
                                                {user.role}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            {user.subscription ? (
                                                <div>
                                                    <div className="font-bold text-white">{user.subscription.plan}</div>
                                                    <div className="text-xs text-gray-500">Expires: {new Date(user.subscription.endDate).toLocaleDateString()}</div>
                                                </div>
                                            ) : (
                                                <span className="text-gray-500 text-sm">Free</span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`flex items-center gap-1 text-xs font-bold uppercase ${user.subscription?.status === 'ACTIVE' ? 'text-green-500' : 'text-gray-500'}`}>
                                                {user.subscription?.status === 'ACTIVE' ? <CheckCircle className="w-3 h-3" /> : null}
                                                {user.subscription?.status || 'Inactive'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <form action={toggleUserRole.bind(null, user.id)}>
                                                    <button className="p-2 text-gray-400 hover:text-white hover:bg-zinc-800 rounded transition-colors" title="Toggle Admin Role">
                                                        <MoreVertical className="w-4 h-4" />
                                                    </button>
                                                </form>
                                                <form action={deleteUser.bind(null, user.id)}>
                                                    <button className="p-2 text-red-500 hover:bg-red-500/10 rounded transition-colors" title="Delete User">
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </form>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
