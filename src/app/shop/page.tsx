"use client";

import { ShoppingBag, Star } from "lucide-react";
import Image from "next/image";

const PRODUCTS = [
    { id: 1, name: "Chigozie Premium Jersey", price: 89.99, image: "https://images.unsplash.com/photo-1521572008054-923fe7fb8f00?q=80&w=600&auto=format&fit=crop", category: "Apparel" },
    { id: 2, name: "Gold Edition Scarf", price: 29.99, image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=600&auto=format&fit=crop", category: "Accessories" },
    { id: 3, name: "Pro Training Ball", price: 49.99, image: "https://images.unsplash.com/photo-1614632537229-4a46034f195d?q=80&w=600&auto=format&fit=crop", category: "Equipment" },
    { id: 4, name: "Official Cap", price: 24.99, image: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?q=80&w=600&auto=format&fit=crop", category: "Apparel" },
];

export default function ShopPage() {
    return (
        <div className="bg-black min-h-screen pb-20">
            <div className="bg-zinc-900 border-b border-white/10 py-16">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-5xl font-bold uppercase tracking-tighter text-white mb-4">Official <span className="text-primary">Shop</span></h1>
                    <p className="text-gray-400 max-w-xl mx-auto">
                        Wear the colors of victory. Premium quality merchandise for the true fan.
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4 mt-12">
                {/* Categories (Mock) */}
                <div className="flex justify-center gap-4 mb-12">
                    {["All Products", "Apparel", "Accessories", "Equipment"].map(cat => (
                        <button key={cat} className="px-6 py-2 border border-white/10 rounded-full text-white hover:border-primary hover:text-primary transition-colors text-sm font-medium uppercase">
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Product Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {PRODUCTS.map(product => (
                        <div key={product.id} className="bg-zinc-900 border border-white/5 rounded-sm overflow-hidden group hover:border-primary/50 transition-colors">
                            <div className="relative h-80 bg-zinc-800 overflow-hidden">
                                {/* Use img for external placeholder URLs to avoid next/image config issues */}
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                                <div className="absolute top-4 right-4 bg-white text-black text-xs font-bold px-2 py-1 rounded">
                                    NEW
                                </div>
                            </div>
                            <div className="p-6 text-center">
                                <span className="text-gray-500 text-xs uppercase font-bold mb-2 block">{product.category}</span>
                                <h3 className="text-white font-bold text-lg mb-2 uppercase group-hover:text-primary transition-colors">{product.name}</h3>
                                <div className="flex justify-center items-center gap-1 mb-4">
                                    {[1, 2, 3, 4, 5].map(s => <Star key={s} className="w-3 h-3 text-primary fill-primary" />)}
                                </div>
                                <p className="text-2xl font-bold text-white mb-6">${product.price}</p>

                                <button className="w-full bg-transparent border-2 border-white text-white font-bold uppercase py-2 hover:bg-white hover:text-black transition-colors flex items-center justify-center gap-2">
                                    <ShoppingBag className="w-4 h-4" /> Add to Cart
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
