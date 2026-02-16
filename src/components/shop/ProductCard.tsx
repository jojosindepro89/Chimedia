"use client";

import Link from "next/link";
import { ShoppingBag, Star } from "lucide-react";
import { useCart } from "@/components/providers/CartProvider";

interface Product {
    id: string;
    name: string;
    price: number;
    imageUrl: string | null;
    category: string | null;
}

export default function ProductCard({ product }: { product: Product }) {
    const { addItem } = useCart();

    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault(); // Prevent navigating if wrapped in Link
        addItem({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.imageUrl || "",
            quantity: 1,
            category: product.category || "General"
        });
        // Optional: Show feedback
        alert("Added to cart!");
    };

    return (
        <div className="bg-zinc-900 border border-white/5 rounded-sm overflow-hidden group hover:border-primary/50 transition-colors h-full flex flex-col">
            <Link href={`/shop/${product.id}`} className="block relative h-80 bg-zinc-800 overflow-hidden">
                {product.imageUrl ? (
                    <img
                        src={product.imageUrl}
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-500 bg-zinc-800">
                        No Image
                    </div>
                )}
                <div className="absolute top-4 right-4 bg-white text-black text-xs font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                    VIEW
                </div>
            </Link>
            <div className="p-6 text-center flex-1 flex flex-col">
                <span className="text-gray-500 text-xs uppercase font-bold mb-2 block">{product.category || 'Uncategorized'}</span>
                <Link href={`/shop/${product.id}`} className="block">
                    <h3 className="text-white font-bold text-lg mb-2 uppercase group-hover:text-primary transition-colors line-clamp-2">{product.name}</h3>
                </Link>
                <div className="flex justify-center items-center gap-1 mb-4">
                    {[1, 2, 3, 4, 5].map(s => <Star key={s} className="w-3 h-3 text-primary fill-primary" />)}
                </div>
                <p className="text-2xl font-bold text-white mb-6 mt-auto">₦{product.price.toLocaleString()}</p>

                <button
                    onClick={handleAddToCart}
                    className="w-full bg-transparent border-2 border-white text-white font-bold uppercase py-2 hover:bg-white hover:text-black transition-colors flex items-center justify-center gap-2"
                >
                    <ShoppingBag className="w-4 h-4" /> Add to Cart
                </button>
            </div>
        </div>
    );
}
