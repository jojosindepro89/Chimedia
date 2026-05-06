"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function AdminGroupError({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error("Admin Group error:", error);
    }, [error]);

    return (
        <div className="min-h-screen bg-black flex items-center justify-center p-8">
            <div className="max-w-2xl w-full bg-zinc-900 border border-red-500/30 rounded-xl p-8">
                <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-red-500/20 rounded-full flex items-center justify-center">
                        <span className="text-red-400 text-xl">⚠</span>
                    </div>
                    <h1 className="text-2xl font-bold text-white">Admin Group Error</h1>
                </div>

                <div className="bg-black/50 border border-white/10 rounded-lg p-4 mb-6 font-mono text-sm">
                    <p className="text-red-400 font-bold mb-2">Error Message:</p>
                    <p className="text-gray-300">{error.message || "Unknown error"}</p>
                    {error.digest && (
                        <>
                            <p className="text-red-400 font-bold mt-4 mb-2">Digest:</p>
                            <p className="text-gray-300">{error.digest}</p>
                        </>
                    )}
                </div>

                <div className="flex gap-4">
                    <button
                        onClick={reset}
                        className="flex-1 bg-primary text-black font-bold uppercase py-3 rounded hover:bg-yellow-500 transition-colors"
                    >
                        Try Again
                    </button>
                    <Link
                        href="/admin/login"
                        className="flex-1 bg-zinc-800 text-white font-bold uppercase py-3 rounded hover:bg-zinc-700 transition-colors text-center"
                    >
                        Back to Login
                    </Link>
                </div>
            </div>
        </div>
    );
}
