import { prisma } from "@/lib/prisma";
import { getFootballNews, NewsArticle } from "@/lib/news-api";
import Link from "next/link";
import { Calendar, User, ArrowRight, ExternalLink } from "lucide-react";

export const dynamic = 'force-dynamic';

export default async function NewsPage() {
    const [dbPosts, externalNews] = await Promise.all([
        prisma.post.findMany({
            where: { published: true },
            orderBy: { createdAt: 'desc' },
            include: { category: true }
        }),
        getFootballNews()
    ]);

    // Combine or categorize?
    // Let's just show DB posts first (Official), then External News (Trending)

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

            <div className="container mx-auto px-4 mt-12">

                {/* Official / Internal News */}
                {dbPosts.length > 0 && (
                    <div className="mb-16">
                        <h2 className="text-2xl font-bold text-primary mb-8 uppercase tracking-wide border-l-4 border-primary pl-4">Official Updates</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {dbPosts.map((post) => (
                                <NewsCard key={post.id} news={post} isExternal={false} />
                            ))}
                        </div>
                    </div>
                )}

                {/* External News */}
                <div>
                    <h2 className="text-2xl font-bold text-white mb-8 uppercase tracking-wide border-l-4 border-white pl-4">Trending Globally</h2>
                    {externalNews.length === 0 ? (
                        <p className="text-gray-500">No external news available at the moment.</p>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {externalNews.map((article, idx) => (
                                <NewsCard key={idx} news={article} isExternal={true} />
                            ))}
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
}

function NewsCard({ news, isExternal }: { news: any, isExternal: boolean }) {
    // If external, route to our internal reader with query params
    const href = isExternal
        ? `/news/read?url=${encodeURIComponent(news.url)}&title=${encodeURIComponent(news.title)}&source=${encodeURIComponent(news.source.name)}`
        : `/news/${news.slug}`;

    // Always open in self now, as requested "opening in my website"
    const target = "_self";

    const image = isExternal ? (news.urlToImage || "/placeholder.jpg") : (news.featuredImage || "/placeholder.jpg");
    const category = isExternal ? (news.source.name || "News") : (news.category?.name || "News");
    const date = isExternal ? new Date(news.publishedAt).toLocaleDateString() : new Date(news.createdAt).toLocaleDateString();
    const author = isExternal ? (news.author || "Unknown") : "Admin";

    return (
        <article className="group bg-zinc-900 border border-white/5 rounded-sm overflow-hidden hover:border-primary/50 transition-all hover:-translate-y-1 h-full flex flex-col">
            <Link href={href} target={target} className="flex flex-col h-full">
                <div className="relative h-48 overflow-hidden bg-black/50">
                    <img src={image} alt={news.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 opacity-80 group-hover:opacity-100" />
                    <div className="absolute top-4 left-4">
                        <span className="bg-primary text-black text-xs font-bold px-2 py-1 uppercase rounded-sm">{category}</span>
                    </div>
                </div>
                <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-center text-gray-500 text-xs mb-3 space-x-3">
                        <div className="flex items-center truncate max-w-[100px]"><User className="w-3 h-3 mr-1" /> {author}</div>
                        <div className="flex items-center"><Calendar className="w-3 h-3 mr-1" /> {date}</div>
                    </div>
                    <h2 className="text-xl font-bold text-white mb-3 group-hover:text-primary transition-colors leading-tight line-clamp-2">
                        {news.title}
                    </h2>
                    <p className="text-gray-400 text-sm mb-4 line-clamp-2 flex-1">
                        {news.description || news.excerpt || "No description available."}
                    </p>
                    <div className="flex items-center text-primary font-bold text-sm uppercase tracking-wide mt-auto">
                        {isExternal ? "Read Article" : "Read More"} <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
                    </div>
                </div>
            </Link>
        </article>
    );
}
