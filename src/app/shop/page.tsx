import { prisma } from "@/lib/prisma";
import ProductCard from "@/components/shop/ProductCard";

export const dynamic = 'force-dynamic';

export default async function ShopPage() {
    const products = await prisma.product.findMany({
        orderBy: { createdAt: 'desc' }
    });

    const categories = Array.from(new Set(products.map(p => p.category).filter(Boolean)));

    return (
        <div className="bg-black min-h-screen pb-20 animate-fade-in-up">
            <div className="bg-zinc-900 border-b border-white/10 py-16">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-5xl font-bold uppercase tracking-tighter text-white mb-4">Official <span className="text-primary">Shop</span></h1>
                    <p className="text-gray-400 max-w-xl mx-auto">
                        Wear the colors of victory. Premium quality merchandise for the true fan.
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4 mt-12">
                {/* Categories */}
                <div className="flex flex-wrap justify-center gap-4 mb-12">
                    <button className="px-6 py-2 border border-white/10 rounded-full text-white hover:border-primary hover:text-primary transition-colors text-sm font-medium uppercase bg-white/5">
                        All Products
                    </button>
                    {categories.map(cat => (
                        <button key={cat} className="px-6 py-2 border border-white/10 rounded-full text-white hover:border-primary hover:text-primary transition-colors text-sm font-medium uppercase">
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Product Grid */}
                {products.length === 0 ? (
                    <div className="text-center text-gray-500 py-20">
                        <p className="text-xl">No products found. Check back soon!</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {products.map(product => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
