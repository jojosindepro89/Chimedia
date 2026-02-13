
"use client";

import Link from "next/link";
import { Lock, Mail, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        // Simulate API call
        setTimeout(() => {
            setLoading(false);
            // Redirect to Admin for demo purposes, or Home
            router.push("/admin");
        }, 1000);
    };

    return (
        <div className="min-h-screen bg-black flex items-center justify-center relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute inset-0 z-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1556056504-5c7696c4c28d?q=80&w=2076&auto=format&fit=crop')] bg-cover bg-center"></div>

            <div className="relative z-10 w-full max-w-md px-4">
                <div className="bg-zinc-900/90 backdrop-blur-md border border-white/10 p-8 rounded-sm shadow-2xl">
                    <div className="text-center mb-8">
                        <Link href="/" className="text-3xl font-bold tracking-tighter uppercase block mb-2">
                            <span className="text-white">Chigozie</span>
                            <span className="text-primary ml-1">Media</span>
                        </Link>
                        <p className="text-gray-400 text-sm">Sign in to access premium content</p>
                    </div>

                    <form className="space-y-6" onSubmit={handleLogin}>
                        <div>
                            <label className="block text-xs uppercase font-bold text-gray-500 mb-2">Email Address</label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                                <input type="email" required className="w-full bg-black/50 border border-white/10 rounded px-10 py-3 text-white focus:outline-none focus:border-primary transition-colors placeholder-gray-600" placeholder="you@example.com" />
                            </div>
                        </div>
                        <div>
                            <label className="block text-xs uppercase font-bold text-gray-500 mb-2">Password</label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                                <input type="password" required className="w-full bg-black/50 border border-white/10 rounded px-10 py-3 text-white focus:outline-none focus:border-primary transition-colors placeholder-gray-600" placeholder="••••••••" />
                            </div>
                        </div>

                        <div className="flex items-center justify-between text-xs">
                            <label className="flex items-center text-gray-400 cursor-pointer">
                                <input type="checkbox" className="mr-2" /> Remember me
                            </label>
                            <Link href="#" className="text-primary hover:text-white transition-colors">Forgot Password?</Link>
                        </div>

                        <button type="submit" disabled={loading} className="w-full bg-primary text-black font-bold uppercase py-3 rounded hover:bg-yellow-500 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed">
                            {loading ? "Signing In..." : (
                                <>Sign In <ArrowRight className="w-4 h-4" /></>
                            )}
                        </button>
                    </form>

                    <div className="mt-8 text-center text-sm text-gray-500 space-y-4">
                        <div>
                            Don't have an account? <Link href="/register" className="text-white font-bold hover:text-primary transition-colors ml-1 uppercase">Sign Up</Link>
                        </div>
                        <div>
                            <Link href="/admin" className="text-gray-600 hover:text-gray-400 text-xs uppercase tracking-widest transition-colors font-bold">Admin Login</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

