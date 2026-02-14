"use client";

import { useActionState } from "react";
import { createFirstAdmin } from "@/app/actions";
import { Lock, User, Mail, ShieldAlert } from "lucide-react";

const initialState = {
    message: '',
};

export default function AdminSetupPage() {
    const [state, formAction] = useActionState(createFirstAdmin, initialState);

    return (
        <div className="min-h-screen bg-black flex items-center justify-center p-4">
            <div className="w-full max-w-md bg-zinc-900 border border-yellow-500/20 rounded-sm p-8 shadow-2xl relative overflow-hidden">
                <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-yellow-500/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-yellow-500/20">
                        <ShieldAlert className="w-8 h-8 text-yellow-500" />
                    </div>
                    <h1 className="text-2xl font-bold text-white uppercase tracking-wider">Admin Setup</h1>
                    <p className="text-gray-500 text-sm mt-2">Create your first Administrator account.</p>
                </div>

                <form action={formAction} className="space-y-6">
                    <div>
                        <label className="block text-xs uppercase font-bold text-gray-500 mb-2">Full Name</label>
                        <div className="relative">
                            <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                            <input
                                name="name"
                                type="text"
                                className="w-full bg-black/50 border border-white/10 rounded px-12 py-3 text-white focus:outline-none focus:border-yellow-500 transition-colors"
                                placeholder="Admin Name"
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs uppercase font-bold text-gray-500 mb-2">Email (Login Username)</label>
                        <div className="relative">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                            <input
                                name="email"
                                type="email"
                                className="w-full bg-black/50 border border-white/10 rounded px-12 py-3 text-white focus:outline-none focus:border-yellow-500 transition-colors"
                                placeholder="admin@domain.com"
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
                                className="w-full bg-black/50 border border-white/10 rounded px-12 py-3 text-white focus:outline-none focus:border-yellow-500 transition-colors"
                                placeholder="Strong Password"
                                required
                                minLength={6}
                            />
                        </div>
                    </div>

                    {/* Optional Secret Key field - hidden by default unless needed, 
                        but good to have if user wants to add more admins later via this page 
                        if we enable it. For now, strict "First Admin" flow doesn't strictly need it 
                        if DB check passes. */}

                    {state?.message && (
                        <div className="bg-red-500/10 border border-red-500/20 text-red-500 text-sm font-bold p-3 rounded text-center">
                            {state.message}
                        </div>
                    )}

                    <button
                        type="submit"
                        className="w-full bg-yellow-500 text-black font-bold uppercase py-4 rounded hover:bg-yellow-400 transition-colors shadow-lg shadow-yellow-500/20"
                    >
                        Create Admin Account
                    </button>
                </form>
            </div>
        </div>
    );
}
