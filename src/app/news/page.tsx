import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Calendar, User, ArrowRight } from "lucide-react";

export const dynamic = 'force-dynamic';

export default async function NewsPage() {
    const posts = await prisma.post.findMany({
        where: { published: true },
        orderBy: { createdAt: 'desc' },
        include: { category: true }
    });

    const categories = ["All News", ...Array.from(new Set(posts.map(p => p.category?.name).filter(Boolean)))];

    return (
        <div className="bg-black min-h-screen pb-20">
            {/* Header */}
            <div className="bg-zinc-900 border-b border-white/10 py-20">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-5xl font-bold text-white mb-4 uppercase tracking-tighter">Latest <span className="text-primary">News</span></h1>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        Stay updated with the latest football news, transfer rumours, and match reports from around the globe.
                    </p>
                </div>
            </div>

            {/* Content */}
            <div className="container mx-auto px-4 mt-12">
                {/* Categories */}
                <div className="flex flex-wrap gap-4 mb-12 justify-center">
                    {categories.map((cat) => (
                        <button key={cat as string} className="px-6 py-2 border border-white/10 rounded-full text-white hover:border-primary hover:text-primary transition-colors text-sm font-medium uppercase tracking-wide">
                            {cat as string}
                        </button>
                    ))}
                </div>

                {/* Grid */}
                {posts.length === 0 ? (
                    <div className="text-center text-gray-500 py-20">
                        <p className="text-xl">No news posts found.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {posts.map((post) => (
                            <NewsCard key={post.id} news={post} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

function NewsCard({ news }: { news: any }) {
    return (
        <article className="group bg-zinc-900 border border-white/5 rounded-sm overflow-hidden hover:border-primary/50 transition-all hover:-translate-y-1">
            <Link href={`/news/${news.slug}`}>
                <div className="relative h-48 overflow-hidden">
                    <img src={news.featuredImage || "/placeholder.jpg"} alt={news.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                    <div className="absolute top-4 left-4">
                        <span className="bg-primary text-black text-xs font-bold px-2 py-1 uppercase rounded-sm">{news.category?.name || "News"}</span>
                    </div>
                </div>
                <div className="p-6">
                    <div className="flex items-center text-gray-500 text-xs mb-3 space-x-3">
                        <div className="flex items-center"><User className="w-3 h-3 mr-1" /> Admin</div>
                        <div className="flex items-center"><Calendar className="w-3 h-3 mr-1" /> {new Date(news.createdAt).toLocaleDateString()}</div>
                    </div>
                    <h2 className="text-xl font-bold text-white mb-3 group-hover:text-primary transition-colors leading-tight">
                        {news.title}
                    </h2>
                    <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                        {news.excerpt || "No excerpt available."}
                    </p>
                    <div className="flex items-center text-primary font-bold text-sm uppercase tracking-wide">
                        Read More <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
                    </div>
                </div>
            </Link>
        </article>
    );
}
