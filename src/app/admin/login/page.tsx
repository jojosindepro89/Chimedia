"use client";

import { Lock, User } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { adminDirectLogin } from "./actions";

export default function AdminLoginPage() {
    const router = useRouter();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        
        const formData = new FormData(e.currentTarget);

        try {
            const res = await adminDirectLogin(formData);

            if ("error" in res) {
                setError(res.error);
                setLoading(false);
            } else {
                window.location.href = "/admin";
            }
        } catch (err) {
            console.error("Login Error:", err);
            setError("A critical error occurred. Please try again.");
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-black flex items-center justify-center p-4">
            <div className="w-full max-w-md bg-zinc-900 border border-white/10 rounded-sm p-8 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent" />
                <div className="text-center mb-10">
                    <div className="w-20 h-20 bg-gradient-to-br from-zinc-800 to-black rounded-full flex items-center justify-center mx-auto mb-6 border border-primary/20 shadow-lg shadow-primary/10">
                        <Lock className="w-8 h-8 text-primary" />
                    </div>
                    <div className="inline-block px-3 py-1 bg-primary/10 border border-primary/20 rounded-full mb-4">
                        <span className="text-primary text-[10px] font-bold uppercase tracking-widest">Secure Admin Portal</span>
                    </div>
                    <h1 className="text-3xl font-bold text-white uppercase tracking-wider mb-2">cmhsports<span className="text-primary">.Admin</span></h1>
                    <p className="text-gray-500 text-sm">Enter your credentials to access the control panel.</p>
                </div>
                
                <form onSubmit={handleLogin} className="space-y-6">
                    <div>
                        <label className="block text-xs uppercase font-bold text-gray-500 mb-2">Username</label>
                        <div className="relative">
                            <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                            <input name="username" type="text" className="w-full bg-black/50 border border-white/10 rounded px-12 py-3 text-white focus:outline-none focus:border-primary transition-colors" placeholder="Enter admin username" required />
                        </div>
                    </div>
                    <div>
                        <label className="block text-xs uppercase font-bold text-gray-500 mb-2">Password</label>
                        <div className="relative">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                            <input name="password" type="password" className="w-full bg-black/50 border border-white/10 rounded px-12 py-3 text-white focus:outline-none focus:border-primary transition-colors" placeholder="Enter secure password" required />
                        </div>
                    </div>
                    
                    {error && (
                        <div className="bg-red-500/10 border border-red-500/20 text-red-500 text-sm font-bold p-3 rounded text-center">
                            {error}
                        </div>
                    )}
                    
                    <button type="submit" disabled={loading} className="w-full bg-primary text-black font-bold uppercase py-4 rounded hover:bg-yellow-500 transition-colors shadow-lg shadow-primary/20 disabled:opacity-50">
                        {loading ? "Authenticating..." : "Authenticate"}
                    </button>
                    
                    <div className="text-center mt-6">
                        <a href="/" className="text-gray-500 text-xs hover:text-white transition-colors">Return to Website</a>
                    </div>
                </form>
            </div>
        </div>
    );
}
