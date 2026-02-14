"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Search, User, ShoppingBag } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/components/providers/CartProvider";
import clsx from "clsx";

const navLinks = [
    { name: "Home", href: "/" },
    { name: "News", href: "/news" },
    { name: "Leagues", href: "/leagues" },
    { name: "Transfers", href: "/transfers" },
    { name: "Predictions", href: "/predictions" },
    { name: "Live Scores", href: "/live-scores" },
    { name: "Watch Live", href: "/live" },
    { name: "Shop", href: "/shop" },
    { name: "Membership", href: "/membership" },
];

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const pathname = usePathname();
    const { cartCount } = useCart();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        setIsOpen(false);
    }, [pathname]);

    return (
        <nav
            className={clsx(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-white/10",
                isScrolled ? "bg-black/90 backdrop-blur-md py-3" : "bg-black py-5"
            )}
        >
            <div className="container mx-auto px-4 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="text-2xl font-bold tracking-tighter uppercase">
                    <span className="text-white">Chigozie</span>
                    <span className="text-primary ml-1">Media</span>
                </Link>

                {/* Desktop Nav */}
                <div className="hidden lg:flex items-center space-x-6">
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={clsx(
                                "text-sm font-medium transition-colors hover:text-primary uppercase tracking-wide",
                                pathname === link.href ? "text-primary" : "text-gray-300"
                            )}
                        >
                            {link.name}
                        </Link>
                    ))}
                </div>

                {/* Right Actions */}
                <div className="hidden lg:flex items-center space-x-4">
                    <button className="text-white hover:text-primary transition-colors">
                        <Search className="w-5 h-5" />
                    </button>
                    <Link href="/cart" className="text-white hover:text-primary transition-colors relative">
                        <ShoppingBag className="w-5 h-5" />
                        <span className="absolute -top-1 -right-1 bg-primary text-black text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">{cartCount}</span>
                    </Link>
                    <Link
                        href="/login"
                        className="flex items-center gap-2 text-sm font-medium text-black bg-primary px-4 py-2 rounded-sm hover:bg-yellow-500 transition-colors uppercase"
                    >
                        <User className="w-4 h-4" />
                        <span>Join</span>
                    </Link>
                </div>

                {/* Mobile Toggle */}
                <button
                    className="lg:hidden text-white hover:text-primary"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "100vh" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="lg:hidden bg-black/95 backdrop-blur-xl border-t border-white/10 overflow-y-auto"
                    >
                        <div className="flex flex-col p-6 space-y-6">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className={clsx(
                                        "text-xl font-bold hover:text-primary transition-colors uppercase",
                                        pathname === link.href ? "text-primary" : "text-white"
                                    )}
                                >
                                    {link.name}
                                </Link>
                            ))}
                            <div className="pt-6 border-t border-white/10 flex flex-col space-y-4">
                                <Link
                                    href="/login"
                                    className="w-full text-center text-black bg-primary px-4 py-3 font-bold uppercase hover:bg-yellow-500 transition-colors"
                                >
                                    Sign In / Join
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
