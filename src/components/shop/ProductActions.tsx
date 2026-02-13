"use client";

import { useState } from "react";
import { ShoppingBag, Minus, Plus } from "lucide-react";
import { useCart } from "@/components/providers/CartProvider";

interface Product {
    id: string;
    name: string;
    price: number;
    imageUrl: string | null;
    category: string | null;
}

export default function ProductActions({ product }: { product: Product }) {
    const { addItem } = useCart();
    const [quantity, setQuantity] = useState(1);
    const [size, setSize] = useState("M");

    const handleAddToCart = () => {
        addItem({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.imageUrl || "",
            quantity: quantity,
            size: product.category === 'Apparel' ? size : undefined,
            category: product.category || "General"
        });
        alert("Added to cart!");
    };

    return (
        <div className="space-y-6">
            {/* Size Selector (Conditional) */}
            {product.category === 'Apparel' && (
                <div>
                    <div className="text-sm font-bold uppercase mb-3 text-gray-400">Select Size</div>
                    <div className="flex gap-4">
                        {['S', 'M', 'L', 'XL', 'XXL'].map(s => (
                            <button
                                key={s}
                                onClick={() => setSize(s)}
                                className={`w-12 h-12 rounded border flex items-center justify-center font-bold transition-colors ${size === s
                                        ? 'bg-white text-black border-white'
                                        : 'bg-transparent text-white border-white/20 hover:border-white'
                                    }`}
                            >
                                {s}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* Quantity & Add Button */}
            <div className="flex gap-4">
                <div className="flex items-center border border-white/20 rounded">
                    <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="px-4 py-3 hover:bg-white/10 transition-colors"
                    >
                        <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-12 text-center font-bold">{quantity}</span>
                    <button
                        onClick={() => setQuantity(quantity + 1)}
                        className="px-4 py-3 hover:bg-white/10 transition-colors"
                    >
                        <Plus className="w-4 h-4" />
                    </button>
                </div>

                <button
                    onClick={handleAddToCart}
                    className="flex-1 bg-primary text-black font-bold uppercase py-3 rounded hover:bg-yellow-500 transition-colors flex items-center justify-center gap-2 shadow-lg shadow-primary/20"
                >
                    <ShoppingBag className="w-5 h-5" /> Add to Cart
                </button>
            </div>
        </div>
    );
}
