import Link from "next/link";
import { Calendar, User, ArrowRight } from "lucide-react";

// Mock Data
const MOCK_NEWS = [
    {
        id: 1,
        title: "Mbappe scores hat-trick in thrilling Classico",
        excerpt: "The French superstar showed his class once again in a dominant display at the Bernabeu.",
        category: "La Liga",
        image: "https://images.unsplash.com/photo-1517466787929-bc90951d0974?q=80&w=1000&auto=format&fit=crop",
        author: "James Smith",
        date: "2 hours ago",
        slug: "mbappe-hat-trick-classico"
    },
    {
        id: 2,
        title: "Arsenal agrees terms with Osimhen",
        excerpt: "Sources close to the club confirm that personal terms have been agreed with the Napoli striker.",
        category: "Transfers",
        image: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?q=80&w=1000&auto=format&fit=crop",
        author: "Fabrizio Green",
        date: "5 hours ago",
        slug: "arsenal-osimhen-agreement"
    },
    {
        id: 3,
        title: "Klopp to return to management?",
        excerpt: "Rumours swirl as the former Liverpool boss is spotted in Munich.",
        category: "Bundesliga",
        image: "https://images.unsplash.com/photo-1518609878373-06d740f60d8b?q=80&w=1000&auto=format&fit=crop",
        author: "Sarah Jones",
        date: "1 day ago",
        slug: "klopp-return-rumours"
    },
    {
        id: 4,
        title: "Champions League Quarter-Final Draw Analysis",
        excerpt: "We break down every matchup and predict who will make it to the semi-finals.",
        category: "Champions League",
        image: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?q=80&w=1000&auto=format&fit=crop",
        author: "Tactical Tim",
        date: "1 day ago",
        slug: "ucl-draw-analysis"
    }
];

export default function NewsPage() {
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
                    {["All News", "Premier League", "La Liga", "Transfers", "Champions League"].map((cat) => (
                        <button key={cat} className="px-6 py-2 border border-white/10 rounded-full text-white hover:border-primary hover:text-primary transition-colors text-sm font-medium uppercase tracking-wide">
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {MOCK_NEWS.map((news) => (
                        <NewsCard key={news.id} news={news} />
                    ))}
                </div>
            </div>
        </div>
    );
}

function NewsCard({ news }: { news: any }) {
    return (
        <article className="group bg-zinc-900 border border-white/5 rounded-sm overflow-hidden hover:border-primary/50 transition-all hover:-translate-y-1">
            <Link href={`/news/${news.slug}`}>
                <div className="relative h-48 overflow-hidden">
                    <img src={news.image} alt={news.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                    <div className="absolute top-4 left-4">
                        <span className="bg-primary text-black text-xs font-bold px-2 py-1 uppercase rounded-sm">{news.category}</span>
                    </div>
                </div>
                <div className="p-6">
                    <div className="flex items-center text-gray-500 text-xs mb-3 space-x-3">
                        <div className="flex items-center"><User className="w-3 h-3 mr-1" /> {news.author}</div>
                        <div className="flex items-center"><Calendar className="w-3 h-3 mr-1" /> {news.date}</div>
                    </div>
                    <h2 className="text-xl font-bold text-white mb-3 group-hover:text-primary transition-colors leading-tight">
                        {news.title}
                    </h2>
                    <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                        {news.excerpt}
                    </p>
                    <div className="flex items-center text-primary font-bold text-sm uppercase tracking-wide">
                        Read More <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
                    </div>
                </div>
            </Link>
        </article>
    );
}
