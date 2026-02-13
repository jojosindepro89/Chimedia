"use client";

import Link from "next/link";
import { Lock, Mail, User, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function RegisterPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const handleRegister = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        // Simulate API call
        setTimeout(() => {
            setLoading(false);
            router.push("/");
        }, 1000);
    };

    return (
        <div className="min-h-screen bg-black flex items-center justify-center relative overflow-hidden py-20">
            <div className="absolute inset-0 z-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1517466787929-bc90951d0974?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center"></div>

            <div className="relative z-10 w-full max-w-md px-4">
                <div className="bg-zinc-900/90 backdrop-blur-md border border-white/10 p-8 rounded-sm shadow-2xl">
                    <div className="text-center mb-8">
                        <Link href="/" className="text-3xl font-bold tracking-tighter uppercase block mb-2">
                            <span className="text-white">Chigozie</span>
                            <span className="text-primary ml-1">Media</span>
                        </Link>
                        <p className="text-gray-400 text-sm">Create an account to join the community</p>
                    </div>

                    <form className="space-y-6" onSubmit={handleRegister}>
                        <div>
                            <label className="block text-xs uppercase font-bold text-gray-500 mb-2">Full Name</label>
                            <div className="relative">
                                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                                <input type="text" required className="w-full bg-black/50 border border-white/10 rounded px-10 py-3 text-white focus:outline-none focus:border-primary transition-colors placeholder-gray-600" placeholder="John Doe" />
                            </div>
                        </div>
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
                                <input type="password" required className="w-full bg-black/50 border border-white/10 rounded px-10 py-3 text-white focus:outline-none focus:border-primary transition-colors placeholder-gray-600" placeholder="Create a password" />
                            </div>
                        </div>

                        <div className="text-xs text-gray-500">
                            By registering, you agree to our <Link href="/terms" className="text-primary hover:underline">Terms of Service</Link> and <Link href="/privacy" className="text-primary hover:underline">Privacy Policy</Link>.
                        </div>

                        <button type="submit" disabled={loading} className="w-full bg-primary text-black font-bold uppercase py-3 rounded hover:bg-yellow-500 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed">
                            {loading ? "Creating Account..." : (
                                <>Create Account <ArrowRight className="w-4 h-4" /></>
                            )}
                        </button>
                    </form>

                    <div className="mt-8 text-center text-sm text-gray-500">
                        Already have an account? <Link href="/login" className="text-white font-bold hover:text-primary transition-colors ml-1 uppercase">Sign In</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
