import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { ArrowLeft, Star, ShoppingBag, Check } from "lucide-react";
import ProductActions from "@/components/shop/ProductActions";

export const dynamic = 'force-dynamic';

export default async function SingleProductPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    const product = await prisma.product.findUnique({
        where: { id }
    });

    if (!product) {
        return (
            <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center">
                <h1 className="text-4xl font-bold mb-4">Product Not Found</h1>
                <Link href="/shop" className="text-primary hover:underline">Back to Shop</Link>
            </div>
        );
    }

    return (
        <div className="bg-black min-h-screen text-white pb-20 pt-10 animate-fade-in-up">
            <div className="container mx-auto px-4">
                <Link href="/shop" className="inline-flex items-center text-gray-400 hover:text-white transition-colors mb-8 uppercase font-bold text-sm">
                    <ArrowLeft className="w-4 h-4 mr-2" /> Back to Shop
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Image Section */}
                    <div className="bg-zinc-900 border border-white/5 rounded-sm overflow-hidden h-[500px] flex items-center justify-center">
                        {product.imageUrl ? (
                            <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover" />
                        ) : (
                            <div className="text-gray-500">No Image Available</div>
                        )}
                    </div>

                    {/* Details Section */}
                    <div>
                        <div className="mb-2">
                            <span className="bg-primary text-black text-xs font-bold px-2 py-1 rounded uppercase">{product.category || "General"}</span>
                        </div>
                        <h1 className="text-4xl font-bold uppercase tracking-tighter mb-4">{product.name}</h1>

                        <div className="flex items-center gap-4 mb-6">
                            <div className="flex text-primary">
                                {[1, 2, 3, 4, 5].map(i => <Star key={i} className="w-5 h-5 fill-current" />)}
                            </div>
                            <span className="text-gray-400 text-sm">(5.0 based on 0 reviews)</span>
                        </div>

                        <div className="text-3xl font-bold text-white mb-6">₦{product.price.toLocaleString()}</div>

                        <div className="prose prose-invert text-gray-300 mb-8 border-b border-white/10 pb-8">
                            <p>{product.description || "No description available."}</p>
                        </div>

                        {/* Client Side Actions */}
                        <ProductActions product={product} />

                        <div className="mt-8 flex items-center gap-4 text-sm text-gray-400">
                            <div className="flex items-center gap-2">
                                <Check className="w-4 h-4 text-green-500" /> In Stock
                            </div>
                            <div className="flex items-center gap-2">
                                <Check className="w-4 h-4 text-green-500" /> Official Merch
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}


