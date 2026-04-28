import Link from "next/link";
import { LogOut } from "lucide-react";
import { verifyAdminSession } from "@/lib/session";
import { adminLogout } from "@/app/actions";
import AdminNav from "@/components/admin/SidebarLink";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
    const session = await verifyAdminSession();
    const user = session?.user;
    const initial = (user?.name?.charAt(0) || user?.email?.charAt(0) || "A").toUpperCase();

    return (
        <div className="flex h-screen bg-[#0a0a0a] text-white overflow-hidden">
            {/* Sidebar */}
            <aside className="w-64 shrink-0 flex flex-col bg-[#111111] border-r border-white/[0.06]">
                {/* Logo */}
                <div className="px-6 py-5 border-b border-white/[0.06]">
                    <Link href="/" className="flex items-center gap-2.5 group">
                        <div className="w-8 h-8 bg-primary rounded-sm flex items-center justify-center shrink-0 shadow-lg shadow-primary/30 group-hover:shadow-primary/50 transition-shadow">
                            <span className="text-black font-black text-sm">C</span>
                        </div>
                        <div>
                            <span className="font-black uppercase tracking-tight text-white text-sm block leading-tight">cmhsports</span>
                            <span className="text-[10px] text-gray-500 uppercase tracking-widest font-medium">Admin Panel</span>
                        </div>
                    </Link>
                </div>

                {/* Profile chip */}
                <div className="px-4 py-4 border-b border-white/[0.06]">
                    <div className="flex items-center gap-3 bg-white/[0.04] rounded-lg p-3">
                        <div className="w-9 h-9 bg-gradient-to-br from-primary to-yellow-700 rounded-lg flex items-center justify-center font-black text-black text-sm shrink-0 shadow-lg shadow-primary/20">
                            {initial}
                        </div>
                        <div className="min-w-0 flex-1">
                            <div className="text-white font-bold text-sm truncate">{user?.name || "Admin"}</div>
                            <div className="text-gray-500 text-[11px] truncate">{user?.email || ""}</div>
                        </div>
                        <span className="w-2 h-2 bg-green-500 rounded-full shrink-0 ring-2 ring-green-500/20"></span>
                    </div>
                </div>

                {/* Nav links */}
                <AdminNav />

                {/* Logout */}
                <div className="px-3 py-4 border-t border-white/[0.06]">
                    <form action={adminLogout}>
                        <button className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-gray-500 hover:text-red-400 hover:bg-red-500/[0.08] transition-all group border border-transparent hover:border-red-500/20">
                            <LogOut size={16} className="group-hover:scale-110 transition-transform shrink-0" />
                            <span className="text-sm font-bold uppercase tracking-wide">Logout</span>
                        </button>
                    </form>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto">
                <div className="p-8">
                    {children}
                </div>
            </main>
        </div>
    );
}
