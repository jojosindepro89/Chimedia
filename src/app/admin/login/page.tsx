"use client";

import { useActionState } from "react";
import { adminLogin } from "@/app/actions";
import { Lock, User } from "lucide-react";

const initialState = {
    message: '',
};

export default function AdminLoginPage() {
    const [state, formAction] = useActionState(adminLogin, initialState);

    return (
        <div className="min-h-screen bg-black flex items-center justify-center p-4">
            <div className="w-full max-w-md bg-zinc-900 border border-white/10 rounded-sm p-8 shadow-2xl relative overflow-hidden">
                {/* Decorative Elements */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent" />

                <div className="text-center mb-10">
                    <div className="w-16 h-16 bg-zinc-800 rounded-full flex items-center justify-center mx-auto mb-4 border border-white/5">
                        <Lock className="w-8 h-8 text-primary" />
                    </div>
                    <h1 className="text-2xl font-bold text-white uppercase tracking-wider">Admin Access</h1>
                    <p className="text-gray-500 text-sm mt-2">Restricted Area. Authorized Personnel Only.</p>
                </div>

                <form action={formAction} className="space-y-6">
                    <div>
                        <label className="block text-xs uppercase font-bold text-gray-500 mb-2">Username</label>
                        <div className="relative">
                            <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                            <input
                                name="username"
                                type="text"
                                className="w-full bg-black/50 border border-white/10 rounded px-12 py-3 text-white focus:outline-none focus:border-primary transition-colors"
                                placeholder="Enter admin username"
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs uppercase font-bold text-gray-500 mb-2">Password</label>
                        <div className="relative">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                            <input
                                name="password"
                                type="password"
                                className="w-full bg-black/50 border border-white/10 rounded px-12 py-3 text-white focus:outline-none focus:border-primary transition-colors"
                                placeholder="Enter secure password"
                                required
                            />
                        </div>
                    </div>

                    {state?.message && (
                        <div className="bg-red-500/10 border border-red-500/20 text-red-500 text-sm font-bold p-3 rounded text-center">
                            {state.message}
                        </div>
                    )}

                    <button
                        type="submit"
                        className="w-full bg-primary text-black font-bold uppercase py-4 rounded hover:bg-yellow-500 transition-colors shadow-lg shadow-primary/20"
                    >
                        Authenticate
                    </button>

                    <div className="text-center">
                        <a href="/" className="text-gray-500 text-xs hover:text-white transition-colors">Return to Website</a>
                    </div>
                </form>
            </div>
        </div>
    );
}
