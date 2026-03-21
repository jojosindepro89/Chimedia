"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { CheckCircle, XCircle, Loader2 } from "lucide-react";
import Link from 'next/link';

// Component that uses searchParams
function PaymentCallbackContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const reference = searchParams.get("reference");
    const plan = searchParams.get("plan");
    const userId = searchParams.get("userId");

    const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
    const [isSub, setIsSub] = useState(false);

    useEffect(() => {
        if (reference) {
            // Verify payment
            fetch('/api/payment/verify', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ reference, plan, userId })
            })
                .then(res => res.json())
                .then(data => {
                    if (data.success) {
                        setStatus('success');
                        if (data.isSubscription) {
                            setIsSub(true);
                        }
                    } else {
                        setStatus('error');
                    }
                })
                .catch(err => {
                    console.error("Verification fetch error:", err);
                    setStatus('error');
                });
        } else {
            setStatus('error');
        }
    }, [reference, plan, userId]);

    if (status === 'loading') {
        return (
            <div className="flex flex-col items-center">
                <Loader2 className="w-12 h-12 text-primary animate-spin mb-4" />
                <h2 className="text-xl font-bold uppercase mb-2">Verifying Payment...</h2>
                <p className="text-gray-400">Please do not close this window.</p>
            </div>
        );
    }

    if (status === 'success') {
        return (
            <div className="flex flex-col items-center">
                <CheckCircle className="w-12 h-12 text-green-500 mb-4" />
                <h2 className="text-xl font-bold uppercase mb-2">Payment Successful!</h2>
                <p className="text-gray-400 mb-6">
                    {isSub ? "Your membership is now active." : "Thank you for your purchase. Your order has been confirmed."}
                </p>
                <Link href={isSub ? "/dashboard" : "/shop"} className="bg-primary text-black font-bold uppercase px-8 py-3 rounded hover:bg-yellow-500 transition-colors">
                    {isSub ? "Go to Dashboard" : "Continue Shopping"}
                </Link>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center">
            <XCircle className="w-12 h-12 text-red-500 mb-4" />
            <h2 className="text-xl font-bold uppercase mb-2">Payment Failed</h2>
            <p className="text-gray-400 mb-6">We could not verify your payment. Please try again or contact support.</p>
            <Link href="/cart" className="bg-zinc-800 text-white font-bold uppercase px-8 py-3 rounded hover:bg-zinc-700 transition-colors">
                Return to Cart
            </Link>
        </div>
    );
}

export default function PaymentCallbackPage() {
    return (
        <div className="min-h-[60vh] flex items-center justify-center bg-black text-white p-4">
            <div className="bg-zinc-900 border border-white/10 p-8 rounded-sm max-w-md w-full text-center">
                <Suspense fallback={
                    <div className="flex flex-col items-center">
                        <Loader2 className="w-12 h-12 text-primary animate-spin mb-4" />
                        <h2 className="text-xl font-bold uppercase mb-2">Loading...</h2>
                    </div>
                }>
                    <PaymentCallbackContent />
                </Suspense>
            </div>
        </div>
    );
}
