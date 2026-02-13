import Link from "next/link";
import { LayoutDashboard, FileText, Trophy, Users, ShoppingBag, Settings, LogOut } from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex h-screen bg-black text-white">
            {/* Sidebar */}
            <aside className="w-64 bg-zinc-900 border-r border-white/10 flex flex-col">
                <div className="p-6 border-b border-white/10">
                    <Link href="/" className="text-xl font-bold tracking-tighter uppercase block">
                        <span className="text-white">Chigozie</span>
                        <span className="text-primary ml-1">Admin</span>
                    </Link>
                </div>

                <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
                    <AdminLink href="/admin" icon={<LayoutDashboard size={20} />} label="Overview" active />
                    <AdminLink href="/admin/posts" icon={<FileText size={20} />} label="Posts" />
                    <AdminLink href="/admin/predictions" icon={<Trophy size={20} />} label="Predictions" />
                    <AdminLink href="/admin/fixtures" icon={<Trophy size={20} />} label="Fixtures" />
                    <AdminLink href="/admin/shop" icon={<ShoppingBag size={20} />} label="Shop Products" />
                    <AdminLink href="/admin/orders" icon={<ShoppingBag size={20} />} label="Orders" />
                    <AdminLink href="/admin/members" icon={<Users size={20} />} label="Members" />
                    <AdminLink href="/admin/settings" icon={<Settings size={20} />} label="Site Settings" />
                </nav>

                <div className="p-4 border-t border-white/10">
                    <button className="flex items-center gap-3 text-red-500 hover:text-red-400 transition-colors w-full px-4 py-2 opacity-80 hover:opacity-100">
                        <LogOut size={20} />
                        <span className="font-bold uppercase text-sm">Logout</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto bg-black p-8">
                {children}
            </main>
        </div>
    );
}

function AdminLink({ href, icon, label, active = false }: any) {
    return (
        <Link href={href} className={`flex items-center gap-3 px-4 py-3 rounded-sm transition-colors ${active ? "bg-primary text-black font-bold" : "text-gray-400 hover:bg-white/5 hover:text-white"}`}>
            {icon}
            <span className="text-sm uppercase tracking-wide font-medium">{label}</span>
        </Link>
    )
}
