"use client";

import Link from "next/link";
import { ArrowLeft, Save, Upload } from "lucide-react";
import { useActionState } from "react";
import { createProduct } from "@/app/actions";

const initialState = {
    message: '',
}

export default function NewProductPage() {
    const [state, formAction] = useActionState(createProduct, initialState);

    return (
        <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-4 mb-8">
                <Link href="/admin/shop" className="bg-zinc-800 p-2 rounded-full text-white hover:bg-zinc-700 transition-colors">
                    <ArrowLeft className="w-5 h-5" />
                </Link>
                <h1 className="text-3xl font-bold text-white uppercase">Add New Product</h1>
            </div>

            <form action={formAction}>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Form Content */}
                    <div className="lg:col-span-2 bg-zinc-900 border border-white/10 rounded-sm p-8">
                        <div className="space-y-6">
                            <div>
                                <label className="block text-xs uppercase font-bold text-gray-500 mb-2">Product Name</label>
                                <input name="name" type="text" className="w-full bg-black/50 border border-white/10 rounded px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors font-bold" placeholder="e.g. 2024/25 Home Kit" required />
                            </div>

                            <div className="grid grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-xs uppercase font-bold text-gray-500 mb-2">Price ($)</label>
                                    <input name="price" type="number" step="0.01" className="w-full bg-black/50 border border-white/10 rounded px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors" placeholder="89.99" required />
                                </div>
                                <div>
                                    <label className="block text-xs uppercase font-bold text-gray-500 mb-2">Stock Quantity</label>
                                    <input name="stock" type="number" className="w-full bg-black/50 border border-white/10 rounded px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors" placeholder="100" required />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs uppercase font-bold text-gray-500 mb-2">Category</label>
                                <select name="category" className="w-full bg-black/50 border border-white/10 rounded px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors appearance-none" required>
                                    <option value="Apparel">Apparel</option>
                                    <option value="Accessories">Accessories</option>
                                    <option value="Equipment">Equipment</option>
                                    <option value="Memorabilia">Memorabilia</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-xs uppercase font-bold text-gray-500 mb-2">Description</label>
                                <textarea name="description" rows={6} className="w-full bg-black/50 border border-white/10 rounded px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors" placeholder="Product details..."></textarea>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar / Image */}
                    <div className="space-y-6">
                        <div className="bg-zinc-900 border border-white/10 rounded-sm p-6">
                            <label className="block text-xs uppercase font-bold text-gray-500 mb-4">Product Image</label>
                            <input type="file" name="image" className="w-full bg-black/50 border border-white/10 rounded px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors" accept="image/*" />
                        </div>

                        <button type="submit" className="w-full bg-primary text-black font-bold uppercase py-4 rounded hover:bg-yellow-500 transition-colors shadow-lg shadow-primary/20 flex items-center justify-center gap-2">
                            <Save className="w-5 h-5" /> Save Product
                        </button>

                        {state?.message && (
                            <p className="text-red-500 text-sm font-bold text-center">{state.message}</p>
                        )}
                    </div>

                </div>
            </form>
        </div>
    );
}
