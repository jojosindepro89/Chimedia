"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, CreditCard, History, Settings, LogOut } from "lucide-react";
import clsx from "clsx";

const links = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'My Subscription', href: '/dashboard/subscription', icon: CreditCard },
    { name: 'Order History', href: '/dashboard/orders', icon: History },
    { name: 'Settings', href: '/dashboard/settings', icon: Settings },
];

export default function DashboardSidebar() {
    const pathname = usePathname();

    return (
        <div className="w-64 bg-zinc-900 border-r border-white/10 min-h-[calc(100vh-72px)] hidden lg:flex flex-col">
            <div className="p-6">
                <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4">User Menu</h2>
                <nav className="space-y-1">
                    {links.map((link) => {
                        const Icon = link.icon;
                        const isActive = pathname === link.href;
                        return (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={clsx(
                                    "flex items-center gap-3 px-4 py-3 rounded text-sm font-medium transition-colors",
                                    isActive
                                        ? "bg-primary text-black font-bold"
                                        : "text-gray-400 hover:text-white hover:bg-white/5"
                                )}
                            >
                                <Icon className="w-5 h-5" />
                                {link.name}
                            </Link>
                        );
                    })}
                </nav>
            </div>

            <div className="mt-auto p-6 border-t border-white/10">
                <button className="flex items-center gap-3 w-full px-4 py-3 text-red-500 hover:bg-red-500/10 rounded transition-colors text-sm font-medium">
                    <LogOut className="w-5 h-5" />
                    Sign Out
                </button>
            </div>
        </div>
    );
}
