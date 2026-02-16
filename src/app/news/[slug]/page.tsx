import Link from "next/link";
import { Calendar, User, Share2, ArrowLeft } from "lucide-react";
import { prisma } from "@/lib/prisma";

export const dynamic = 'force-dynamic';

export default async function SingleNewsPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;

    const post = await prisma.post.findUnique({
        where: { slug },
        include: { category: true }
    });

    const relatedPosts = post ? await prisma.post.findMany({
        where: {
            categoryId: post.categoryId,
            NOT: { id: post.id },
            published: true
        },
        take: 3,
        orderBy: { createdAt: 'desc' }
    }) : [];

    if (!post) {
        return (
            <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center">
                <h1 className="text-4xl font-bold mb-4">Post Not Found</h1>
                <Link href="/news" className="text-primary hover:underline">Back to News</Link>
            </div>
        );
    }

    return (
        <div className="bg-black min-h-screen pb-20 animate-fade-in-up">
            {/* Hero / Header */}
            <div className="relative h-[60vh] w-full">
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url('${post.featuredImage || "/placeholder.jpg"}')` }}
                >
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-8 container mx-auto">
                    <Link href="/news" className="inline-flex items-center text-white/80 hover:text-primary mb-6 transition-colors uppercase text-sm font-bold tracking-wide">
                        <ArrowLeft className="w-4 h-4 mr-2" /> Back to News
                    </Link>
                    <span className="bg-primary text-black px-3 py-1 rounded-sm text-sm font-bold uppercase mb-4 inline-block">{post.category?.name || "News"}</span>
                    <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 leading-tight">{post.title}</h1>
                    <div className="flex items-center text-gray-300 space-x-6 text-sm">
                        <div className="flex items-center"><User className="w-4 h-4 mr-2" /> Admin</div>
                        <div className="flex items-center"><Calendar className="w-4 h-4 mr-2" /> {new Date(post.createdAt).toLocaleDateString()}</div>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="container mx-auto px-4 mt-12 grid grid-cols-1 lg:grid-cols-12 gap-12">
                {/* Main Article */}
                <div className="lg:col-span-8">
                    <div
                        className="prose prose-invert prose-lg max-w-none text-gray-300"
                        dangerouslySetInnerHTML={{ __html: post.content }}
                    />

                    {/* Share & Tags */}
                    <div className="mt-12 pt-8 border-t border-white/10 flex justify-between items-center">
                        <div className="flex space-x-2">
                            <span className="text-gray-500 text-sm">Tags:</span>
                            <span className="text-primary text-sm font-medium">Football</span>
                            <span className="text-primary text-sm font-medium">News</span>
                        </div>
                        <button className="flex items-center text-white hover:text-primary transition-colors">
                            <Share2 className="w-5 h-5 mr-2" /> <span className="uppercase font-bold text-sm">Share</span>
                        </button>
                    </div>
                </div>

                {/* Sidebar */}
                <div className="lg:col-span-4 space-y-8">
                    {/* Related Posts (Placeholder logic for now) */}
                    <div className="bg-zinc-900 border border-white/5 p-6 rounded-sm">
                        <h3 className="text-xl font-bold text-white mb-6 uppercase border-l-4 border-primary pl-4">Related News</h3>
                        <div className="space-y-6">
                            {relatedPosts.length > 0 ? (
                                relatedPosts.map(related => (
                                    <Link key={related.id} href={`/news/${related.slug}`} className="block group">
                                        <div className="flex gap-4">
                                            <div className="w-20 h-16 bg-zinc-800 rounded-sm overflow-hidden flex-shrink-0">
                                                <img src={related.featuredImage || "/placeholder.jpg"} alt={related.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
                                            </div>
                                            <div>
                                                <h4 className="text-white font-bold text-sm leading-tight group-hover:text-primary transition-colors line-clamp-2">{related.title}</h4>
                                                <span className="text-gray-500 text-xs mt-1 block">{new Date(related.createdAt).toLocaleDateString()}</span>
                                            </div>
                                        </div>
                                    </Link>
                                ))
                            ) : (
                                <p className="text-gray-500 text-sm">No related news available.</p>
                            )}
                        </div>
                    </div>

                    {/* Newsletter (Mini) */}
                    <div className="bg-primary p-6 rounded-sm text-center">
                        <h3 className="text-black font-bold text-xl mb-2 uppercase">Don't Miss Out</h3>
                        <p className="text-black/80 text-sm mb-4">Get the latest transfer news sent to your inbox daily.</p>
                        <input type="email" placeholder="Email Address" className="w-full bg-white/20 border border-black/10 placeholder-black/50 text-black px-4 py-2 rounded mb-3 focus:outline-none" />
                        <button className="w-full bg-black text-white font-bold uppercase py-2 hover:bg-zinc-800 transition-colors">Subscribe</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
