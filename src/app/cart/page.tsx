"use client";

import Link from "next/link";
import { ShoppingBag, ArrowLeft, CreditCard, X, Trash2 } from "lucide-react";
import { initiateCheckout } from "@/app/payment-actions";
import { useCart } from "@/components/providers/CartProvider";

export default function CartPage() {
    const { items, removeItem, cartTotal, clearCart } = useCart();
    const shipping = 10.00;
    const finalTotal = cartTotal + (cartTotal > 0 ? shipping : 0);

    return (
        <div className="min-h-screen bg-black text-white pt-20 pb-20">
            <div className="container mx-auto px-4 max-w-4xl">
                <h1 className="text-4xl font-bold uppercase tracking-tighter mb-8 flex items-center gap-4">
                    <ShoppingBag className="w-10 h-10 text-primary" />
                    Your <span className="text-primary">Cart</span>
                </h1>

                {items.length === 0 ? (
                    <div className="text-center py-20 bg-zinc-900 border border-white/10 rounded-sm">
                        <ShoppingBag className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                        <h2 className="text-2xl font-bold uppercase mb-4 text-gray-400">Your cart is empty</h2>
                        <Link href="/shop" className="inline-block bg-primary text-black font-bold uppercase py-3 px-8 rounded hover:bg-yellow-500 transition-colors">
                            Start Shopping
                        </Link>
                    </div>
                ) : (
                    <div className="bg-zinc-900 border border-white/10 rounded-sm p-8 mb-8">
                        <h2 className="text-xl font-bold uppercase mb-6 border-b border-white/10 pb-4 flex justify-between items-center">
                            Order Summary
                            <button onClick={clearCart} className="text-xs text-red-500 hover:text-red-400 uppercase font-bold flex items-center gap-1">
                                <Trash2 className="w-3 h-3" /> Clear Cart
                            </button>
                        </h2>

                        <div className="space-y-6 mb-8">
                            {items.map((item) => (
                                <div key={`${item.id}-${item.size}`} className="flex items-center justify-between pb-6 border-b border-white/5 last:border-0">
                                    <div className="flex items-center gap-4">
                                        <div className="w-16 h-16 bg-zinc-800 rounded bg-cover bg-center shrink-0" style={{ backgroundImage: `url('${item.image || "/placeholder.jpg"}')` }}></div>
                                        <div>
                                            <div className="font-bold text-lg">{item.name}</div>
                                            <div className="text-gray-400 text-sm">
                                                Qty: {item.quantity} {item.size && `• Size: ${item.size}`}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-6">
                                        <div className="font-mono text-xl">${(item.price * item.quantity).toFixed(2)}</div>
                                        <button onClick={() => removeItem(item.id)} className="text-gray-500 hover:text-red-500 transition-colors">
                                            <X className="w-5 h-5" />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="flex justify-between items-center text-gray-400 text-sm mb-2">
                            <span>Subtotal</span>
                            <span>${cartTotal.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between items-center text-gray-400 text-sm mb-6">
                            <span>Shipping</span>
                            <span>${shipping.toFixed(2)}</span>
                        </div>

                        <div className="flex justify-between items-start mb-8">
                            <div>
                                <div className="text-gray-400 text-sm mb-1">Total</div>
                                <div className="text-3xl font-bold text-primary">${finalTotal.toFixed(2)}</div>
                            </div>
                        </div>

                        <form action={async () => {
                            await initiateCheckout(finalTotal);
                        }}>
                            <button type="submit" className="w-full bg-primary text-black font-bold uppercase py-4 rounded hover:bg-yellow-500 transition-colors flex items-center justify-center gap-2 shadow-lg shadow-primary/20">
                                <CreditCard className="w-5 h-5" /> Proceed to Checkout (Paystack)
                            </button>
                        </form>
                    </div>
                )}

                <div className="text-center mt-8">
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
