"use client";

import { useActionState, useState } from "react";
import { createFirstAdmin } from "@/app/actions";
import { Lock, User, Mail, ShieldAlert, Eye, EyeOff, CheckCircle, Key } from "lucide-react";
import Link from "next/link";

const initialState = { message: '', success: false };

export default function AdminSetupPage() {
    const [state, formAction, isPending] = useActionState(createFirstAdmin, initialState);
    const [showPassword, setShowPassword] = useState(false);
    const [showSecret, setShowSecret] = useState(false);

    return (
        <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-4 relative overflow-hidden">
            {/* Background glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />

            <div className="w-full max-w-lg relative">
                {/* Header */}
                <div className="text-center mb-8">
                    <Link href="/" className="inline-flex items-center gap-2 mb-8 group">
                        <div className="w-9 h-9 bg-primary rounded-lg flex items-center justify-center shadow-lg shadow-primary/30">
                            <span className="text-black font-black text-base">C</span>
                        </div>
                        <span className="font-black uppercase tracking-tight text-white text-lg">cmhsports</span>
                    </Link>
                </div>

                <div className="bg-[#111111] border border-white/[0.08] rounded-2xl p-8 shadow-2xl">
                    {/* Icon + Title */}
                    <div className="flex items-center gap-4 mb-8 pb-6 border-b border-white/[0.06]">
                        <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center border border-primary/20 shrink-0">
                            <ShieldAlert className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                            <h1 className="text-xl font-black text-white uppercase tracking-wider">Admin Setup</h1>
                            <p className="text-gray-500 text-sm mt-0.5">Create an administrator account for the control panel.</p>
                        </div>
                    </div>

                    {/* Security notice */}
                    <div className="flex items-start gap-3 bg-yellow-500/[0.06] border border-yellow-500/20 rounded-xl p-4 mb-6">
                        <Key className="w-4 h-4 text-yellow-500 shrink-0 mt-0.5" />
                        <div className="text-xs text-yellow-500/80 leading-relaxed">
                            <span className="font-bold text-yellow-500 block mb-0.5">Secret key required</span>
                            If an admin account already exists, you must provide the <code className="bg-white/10 px-1 rounded font-mono">ADMIN_SETUP_SECRET</code> from your environment variables to create additional admins.
                        </div>
                    </div>

                    <form action={formAction} className="space-y-5">
                        {/* Full Name */}
                        <div>
                            <label className="block text-xs uppercase font-bold text-gray-500 mb-2 tracking-wider">Full Name</label>
                            <div className="relative">
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600" />
                                <input
                                    name="name"
                                    type="text"
                                    required
                                    className="w-full bg-black/40 border border-white/[0.08] rounded-xl pl-11 pr-4 py-3 text-white text-sm focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all placeholder-gray-700"
                                    placeholder="Joseph Bassey"
                                />
                            </div>
                        </div>

                        {/* Email */}
                        <div>
                            <label className="block text-xs uppercase font-bold text-gray-500 mb-2 tracking-wider">Email Address</label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600" />
                                <input
                                    name="email"
                                    type="email"
                                    required
                                    className="w-full bg-black/40 border border-white/[0.08] rounded-xl pl-11 pr-4 py-3 text-white text-sm focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all placeholder-gray-700"
                                    placeholder="admin@cmhsports.com"
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div>
                            <label className="block text-xs uppercase font-bold text-gray-500 mb-2 tracking-wider">Password</label>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600" />
                                <input
                                    name="password"
                                    type={showPassword ? "text" : "password"}
                                    required
                                    minLength={6}
                                    className="w-full bg-black/40 border border-white/[0.08] rounded-xl pl-11 pr-12 py-3 text-white text-sm focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all placeholder-gray-700"
                                    placeholder="At least 6 characters"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(v => !v)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600 hover:text-gray-400 transition-colors"
                                >
                                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                </button>
                            </div>
                        </div>

                        {/* Secret Key */}
                        <div>
                            <label className="block text-xs uppercase font-bold text-gray-500 mb-2 tracking-wider">
                                Setup Secret Key <span className="text-gray-700 normal-case font-normal">(required if admin exists)</span>
                            </label>
                            <div className="relative">
                                <Key className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600" />
                                <input
                                    name="secretKey"
                                    type={showSecret ? "text" : "password"}
                                    className="w-full bg-black/40 border border-white/[0.08] rounded-xl pl-11 pr-12 py-3 text-white text-sm focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/20 transition-all placeholder-gray-700"
                                    placeholder="ADMIN_SETUP_SECRET value"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowSecret(v => !v)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600 hover:text-gray-400 transition-colors"
                                >
                                    {showSecret ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                </button>
                            </div>
                        </div>

                        {/* Error / Success */}
                        {state?.message && (
                            <div className={`flex items-start gap-3 p-4 rounded-xl text-sm font-medium border ${
                                state.success
                                    ? 'bg-green-500/10 border-green-500/20 text-green-400'
                                    : 'bg-red-500/10 border-red-500/20 text-red-400'
                            }`}>
                                {state.success && <CheckCircle className="w-4 h-4 shrink-0 mt-0.5" />}
                                {state.message}
                            </div>
                        )}

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={isPending}
                            className="w-full bg-primary text-black font-black uppercase py-3.5 rounded-xl hover:bg-yellow-400 transition-all shadow-lg shadow-primary/20 hover:shadow-primary/40 disabled:opacity-50 disabled:cursor-not-allowed text-sm tracking-wider mt-2"
                        >
                            {isPending ? "Creating Account..." : "Create Admin Account"}
                        </button>

                        <div className="text-center pt-2">
                            <Link href="/admin/login" className="text-gray-600 text-xs hover:text-gray-400 transition-colors">
                                Already have an account? Sign in →
                            </Link>
                        </div>
                    </form>
                </div>

                <p className="text-center text-gray-700 text-xs mt-6">
                    This page should be protected or removed after initial setup.
                </p>
            </div>
        </div>
    );
}
