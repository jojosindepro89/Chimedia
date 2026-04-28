"use client";

import Link from "next/link";
import { Mail, ArrowRight } from "lucide-react";
import { useActionState } from "react";
import { requestPasswordReset } from "@/app/actions";

const initialState = {
    message: '',
    success: false
};

export default function ForgotPasswordPage() {
    const [state, formAction] = useActionState(requestPasswordReset, initialState);

    return (
        <div className="min-h-screen bg-black flex items-center justify-center relative overflow-hidden animate-fade-in-up">
            <div className="absolute inset-0 z-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1556056504-5c7696c4c28d?q=80&w=2076&auto=format&fit=crop')] bg-cover bg-center"></div>

            <div className="relative z-10 w-full max-w-md px-4">
                <div className="bg-zinc-900/90 backdrop-blur-md border border-white/10 p-8 rounded-sm shadow-2xl">
                    <div className="text-center mb-8">
                        <Link href="/" className="text-3xl font-bold tracking-tighter uppercase block mb-2">
                            <span className="text-white">cmh</span>
                            <span className="text-primary ml-1">sports</span>
                        </Link>
                        <p className="text-gray-400 text-sm">Reset your password to regain access.</p>
                    </div>

                    {state?.success ? (
                        <div className="bg-green-500/10 border border-green-500/20 text-green-500 text-sm font-bold p-4 rounded text-center mb-6">
                            {state.message}
                            <div className="mt-4">
                                <Link href="/login" className="text-white hover:text-primary underline">Return to Login</Link>
                            </div>
                        </div>
                    ) : (
                        <form className="space-y-6" action={formAction}>
                            <div>
                                <label className="block text-xs uppercase font-bold text-gray-500 mb-2">Email Address</label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                                    <input 
                                        type="email" 
                                        name="email"
                                        required 
                                        className="w-full bg-black/50 border border-white/10 rounded px-10 py-3 text-white focus:outline-none focus:border-primary transition-colors placeholder-gray-600" 
                                        placeholder="you@example.com" 
                                    />
                                </div>
                            </div>

                            {state?.message && !state.success && (
                                <div className="bg-red-500/10 border border-red-500/20 text-red-500 text-sm font-bold p-3 rounded text-center">
                                    {state.message}
                                </div>
                            )}

                            <button type="submit" className="w-full bg-primary text-black font-bold uppercase py-3 rounded hover:bg-yellow-500 transition-colors flex items-center justify-center gap-2">
                                Send Reset Link <ArrowRight className="w-4 h-4" />
                            </button>
                        </form>
                    )}

                    <div className="mt-8 text-center text-sm text-gray-500 space-y-4">
                        <div>
                            Remembered your password? <Link href="/login" className="text-white font-bold hover:text-primary transition-colors ml-1 uppercase">Sign In</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
