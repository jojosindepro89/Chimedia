"use client";

import Link from "next/link";
import { Lock, ArrowRight } from "lucide-react";
import { useActionState } from "react";
import { resetPassword } from "@/app/actions";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

const initialState = {
    message: '',
    success: false
};

function ResetPasswordForm() {
    const searchParams = useSearchParams();
    const token = searchParams.get('token');
    const [state, formAction] = useActionState(resetPassword, initialState);

    if (!token) {
        return (
            <div className="bg-red-500/10 border border-red-500/20 text-red-500 text-sm font-bold p-4 rounded text-center mb-6">
                Invalid or missing reset token. Please request a new link.
            </div>
        );
    }

    if (state?.success) {
        return (
            <div className="bg-green-500/10 border border-green-500/20 text-green-500 text-sm font-bold p-4 rounded text-center mb-6">
                {state.message}
                <div className="mt-6">
                    <Link href="/login" className="w-full block bg-primary text-black font-bold uppercase py-3 rounded hover:bg-yellow-500 transition-colors">
                        Go to Login
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <form className="space-y-6" action={formAction}>
            <input type="hidden" name="token" value={token} />

            <div>
                <label className="block text-xs uppercase font-bold text-gray-500 mb-2">New Password</label>
                <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                    <input 
                        type="password" 
                        name="password"
                        required 
                        minLength={6}
                        className="w-full bg-black/50 border border-white/10 rounded px-10 py-3 text-white focus:outline-none focus:border-primary transition-colors placeholder-gray-600" 
                        placeholder="••••••••" 
                    />
                </div>
                <p className="text-gray-500 text-[10px] mt-1">Must be at least 6 characters.</p>
            </div>

            {state?.message && !state.success && (
                <div className="bg-red-500/10 border border-red-500/20 text-red-500 text-sm font-bold p-3 rounded text-center">
                    {state.message}
                </div>
            )}

            <button type="submit" className="w-full bg-primary text-black font-bold uppercase py-3 rounded hover:bg-yellow-500 transition-colors flex items-center justify-center gap-2">
                Set New Password <ArrowRight className="w-4 h-4" />
            </button>
        </form>
    );

}

export default function ResetPasswordPage() {
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
                        <p className="text-gray-400 text-sm">Choose a new secure password.</p>
                    </div>

                    <Suspense fallback={<div className="text-white text-center text-sm py-4">Loading...</div>}>
                        <ResetPasswordForm />
                    </Suspense>
                </div>
            </div>
        </div>
    );
}
