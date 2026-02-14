import Link from "next/link";
import { Plus, Search, Filter, MoreVertical, Edit, Trash2 } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { deleteProduct } from "@/app/actions";

export default async function AdminShopPage() {
    const products = await prisma.product.findMany({
        orderBy: { createdAt: 'desc' }
    });

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-white uppercase tracking-tight">Shop Products</h1>
                    <p className="text-gray-400 mt-1">Manage inventory, prices, and orders</p>
                </div>
                <Link href="/admin/shop/new" className="bg-primary text-black font-bold uppercase px-6 py-3 rounded hover:bg-yellow-500 transition-colors flex items-center gap-2">
                    <Plus className="w-5 h-5" /> Add Product
                </Link>
            </div>

            {/* Filters */}
            <div className="flex flex-col md:flex-row gap-4 bg-zinc-900/50 p-4 rounded-sm border border-white/5">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                    <input type="text" placeholder="Search products..." className="w-full bg-black border border-white/10 rounded px-10 py-2 text-white focus:outline-none focus:border-primary transition-colors" />
                </div>
                <button className="flex items-center justify-center gap-2 px-6 py-2 bg-black border border-white/10 rounded text-gray-300 hover:text-white hover:border-white/30 transition-colors">
                    <Filter className="w-4 h-4" /> Filter
                </button>
            </div>

            {/* Products Table */}
            <div className="bg-zinc-900 border border-white/10 rounded-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="bg-black/50 border-b border-white/10 text-left">
                                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Product</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Category</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Price</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Stock</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Status</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {products.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                                        No products found. Click "Add Product" to create one.
                                    </td>
                                </tr>
                            ) : (
                                products.map((product) => (
                                    <tr key={product.id} className="hover:bg-white/5 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 bg-zinc-800 rounded bg-cover bg-center" style={{ backgroundImage: `url(${product.imageUrl || 'https://via.placeholder.com/40'})` }}></div>
                                                <span className="font-bold text-white">{product.name}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-gray-300">{product.category}</td>
                                        <td className="px-6 py-4 text-white font-mono">${product.price.toFixed(2)}</td>
                                        <td className="px-6 py-4 text-gray-300">{product.stock}</td>
                                        <td className="px-6 py-4">
                                            <span className={`px-2 py-1 rounded text-xs font-bold uppercase ${product.stock > 0 ? 'bg-green-500/20 text-green-500' : 'bg-red-500/20 text-red-500'}`}>
                                                {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <Link href={`/admin/shop/${product.id}/edit`} className="p-2 text-gray-400 hover:text-white hover:bg-zinc-800 rounded transition-colors">
                                                    <Edit className="w-4 h-4" />
                                                </Link>
                                                <form action={deleteProduct.bind(null, product.id)}>
                                                    <button className="p-2 text-red-500 hover:bg-red-500/10 rounded transition-colors">
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </form>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
