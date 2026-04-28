"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, LayoutDashboard, FileText, Trophy, Users, ShoppingBag, Settings, Activity, Zap } from "lucide-react";
import clsx from "clsx";

const navItems = [
    { href: "/admin", icon: LayoutDashboard, label: "Overview", exact: true },
    { href: "/admin/posts", icon: FileText, label: "Posts" },
    { href: "/admin/predictions", icon: Trophy, label: "Predictions" },
    { href: "/admin/fixtures", icon: Activity, label: "Fixtures" },
    { href: "/admin/shop", icon: ShoppingBag, label: "Shop Products" },
    { href: "/admin/orders", icon: Zap, label: "Orders" },
    { href: "/admin/members", icon: Users, label: "Members" },
    { href: "/admin/api-config", icon: Settings, label: "API Config" },
    { href: "/admin/settings", icon: Settings, label: "Site Settings" },
];

export default function AdminNav() {
    const pathname = usePathname();

    return (
        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-0.5">
            <p className="text-[10px] text-gray-600 uppercase font-bold tracking-widest px-3 mb-3">Main Menu</p>
            {navItems.map(({ href, icon: Icon, label, exact }) => {
                const isActive = exact ? pathname === href : pathname.startsWith(href);
                return (
                    <Link
                        key={href}
                        href={href}
                        className={clsx(
                            "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all group border",
                            isActive
                                ? "bg-primary/10 text-primary border-primary/20"
                                : "text-gray-400 hover:text-white hover:bg-white/[0.06] border-transparent"
                        )}
                    >
                        <Icon
                            size={16}
                            className={clsx(
                                "shrink-0 transition-colors",
                                isActive ? "text-primary" : "group-hover:text-primary"
                            )}
                        />
                        <span className={clsx("text-sm tracking-wide flex-1", isActive ? "font-bold" : "font-medium")}>
                            {label}
                        </span>
                        <ChevronRight
                            size={12}
                            className={clsx(
                                "transition-opacity",
                                isActive ? "opacity-50 text-primary" : "opacity-0 group-hover:opacity-100 text-gray-600"
                            )}
                        />
                    </Link>
                );
            })}
        </nav>
    );
}
