"use client";

import Link from "next/link";
import { ShoppingBag, ArrowLeft, CreditCard } from "lucide-react";
import { initiateCheckout } from "@/app/payment-actions";

export default function CartPage() {
    return (
        <div className="min-h-screen bg-black text-white pt-20 pb-20">
            <div className="container mx-auto px-4 max-w-4xl">
                <h1 className="text-4xl font-bold uppercase tracking-tighter mb-8 flex items-center gap-4">
                    <ShoppingBag className="w-10 h-10 text-primary" />
                    Your <span className="text-primary">Cart</span>
                </h1>

                {/* Demo Cart Item for Paystack Testing */}
                <div className="bg-zinc-900 border border-white/10 rounded-sm p-8 mb-8">
                    <h2 className="text-xl font-bold uppercase mb-6 border-b border-white/10 pb-4">Order Summary</h2>

                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-4">
                            <div className="w-16 h-16 bg-zinc-800 rounded bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1522770179533-24471fcdba45?q=80&w=2000&auto=format&fit=crop')" }}></div>
                            <div>
                                <div className="font-bold text-lg">2024/25 Home Kit</div>
                                <div className="text-gray-400 text-sm">Size: L</div>
                            </div>
                        </div>
                        <div className="font-mono text-xl">$89.99</div>
                    </div>

                    <div className="flex justify-between items-center text-gray-400 text-sm mb-2">
                        <span>Subtotal</span>
                        <span>$89.99</span>
                    </div>
                    <div className="flex justify-between items-center text-gray-400 text-sm mb-6">
                        <span>Shipping</span>
                        <span>$10.00</span>
                    </div>

                    <div className="flex justify-between items-center text-xl font-bold text-primary border-t border-white/10 pt-4 mb-8">
                        <span>Total</span>
                        <span>$99.99</span>
                    </div>

                    <form action={initiateCheckout.bind(null, 9999)}>
                        <button type="submit" className="w-full bg-primary text-black font-bold uppercase py-4 rounded hover:bg-yellow-500 transition-colors flex items-center justify-center gap-2 shadow-lg shadow-primary/20">
                            <CreditCard className="w-5 h-5" /> Proceed to Checkout (Paystack)
                        </button>
                    </form>
                </div>

                <div className="text-center">
                    <Link
                        href="/shop"
                        className="inline-flex items-center text-gray-400 font-bold uppercase hover:text-white transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" /> Continue Shopping
                    </Link>
                </div>
            </div>
        </div>
    );
}
