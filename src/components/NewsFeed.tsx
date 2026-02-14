import { getFootballNews } from "@/lib/news-api";
import Link from "next/link";
import { ArrowRight, Calendar, ExternalLink } from "lucide-react";

export default async function NewsFeed() {
    const news = await getFootballNews();

    // Take top 20
    const topNews = news.slice(0, 20);

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {topNews.map((article, idx) => (
                <div key={idx} className="group bg-black border border-white/10 rounded-sm overflow-hidden hover:border-primary/50 transition-all flex flex-col h-full">
                    <div className="relative h-48 overflow-hidden">
                        <img
                            src={article.urlToImage || "https://images.unsplash.com/photo-1522778119026-d647f0565c6a?auto=format&fit=crop&q=80"}
                            alt={article.title}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 opacity-80 group-hover:opacity-100"
                        />
                        <div className="absolute top-2 right-2 bg-black/80 p-1.5 rounded-full text-white">
                            <ExternalLink className="w-3 h-3" />
                        </div>
                    </div>

                    <div className="p-5 flex flex-col flex-1">
                        <div className="flex items-center text-gray-500 text-xs mb-3 space-x-2">
                            <span className="bg-white/10 px-2 py-0.5 rounded text-gray-300">{article.source.name}</span>
                            <span>•</span>
                            <span className="flex items-center"><Calendar className="w-3 h-3 mr-1" /> {new Date(article.publishedAt).toLocaleDateString()}</span>
                        </div>

                        <h3 className="text-white font-bold text-lg mb-3 leading-tight line-clamp-3 group-hover:text-primary transition-colors">
                            {article.title}
                        </h3>

                        <p className="text-gray-400 text-sm mb-4 line-clamp-3 flex-1">
                            {article.description || "Click to read more about this story."}
                        </p>

                        <Link
                            href={`/news/read?url=${encodeURIComponent(article.url)}&title=${encodeURIComponent(article.title)}&source=${encodeURIComponent(article.source.name)}`}
                            className="inline-flex items-center text-primary font-bold uppercase text-xs tracking-wide hover:underline mt-auto"
                        >
                            Read Article <ArrowRight className="ml-1 w-3 h-3" />
                        </Link>
                    </div>
                </div>
            ))}
        </div>
    )
}
