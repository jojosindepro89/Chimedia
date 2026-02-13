import Link from "next/link";
import { Calendar, User, Share2, ArrowLeft } from "lucide-react";

export default async function SingleNewsPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    // Mock Data (In a real app, fetch based on slug)
    const post = {
        title: "Mbappe scores hat-trick in thrilling Classico",
        content: `
      <p class="mb-6">Kylian Mbappe announced his arrival in the biggest fixture in world football with a stunning hat-trick as Real Madrid defeated Barcelona 4-1 at the Santiago Bernabeu.</p>
      <p class="mb-6">The French superstar opened the scoring in the 12th minute with a blistering run down the left flank, cutting inside and curling the ball into the top corner.</p>
      <h3 class="text-2xl font-bold text-white mb-4">A Night to Remember</h3>
      <p class="mb-6">Barcelona equalized shortly after through Lewandowski, but Mbappe restored the lead just before half-time. His third goal came from the penalty spot in the 78th minute, sealing a memorable victory for Los Blancos.</p>
      <p class="mb-6">"It's a dream come true," Mbappe said after the match. "To score three goals in my first Classico is something special."</p>
    `,
        category: "La Liga",
        image: "https://images.unsplash.com/photo-1517466787929-bc90951d0974?q=80&w=1000&auto=format&fit=crop",
        author: "James Smith",
        date: "Oct 24, 2026"
    };

    return (
        <div className="bg-black min-h-screen pb-20">
            {/* Hero / Header */}
            <div className="relative h-[60vh] w-full">
                <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url('${post.image}')` }}
                >
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-8 container mx-auto">
                    <Link href="/news" className="inline-flex items-center text-white/80 hover:text-primary mb-6 transition-colors uppercase text-sm font-bold tracking-wide">
                        <ArrowLeft className="w-4 h-4 mr-2" /> Back to News
                    </Link>
                    <span className="bg-primary text-black px-3 py-1 rounded-sm text-sm font-bold uppercase mb-4 inline-block">{post.category}</span>
                    <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 leading-tight">{post.title}</h1>
                    <div className="flex items-center text-gray-300 space-x-6 text-sm">
                        <div className="flex items-center"><User className="w-4 h-4 mr-2" /> {post.author}</div>
                        <div className="flex items-center"><Calendar className="w-4 h-4 mr-2" /> {post.date}</div>
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
                            <span className="text-primary text-sm font-medium">Real Madrid</span>
                            <span className="text-primary text-sm font-medium">Mbappe</span>
                            <span className="text-primary text-sm font-medium">La Liga</span>
                        </div>
                        <button className="flex items-center text-white hover:text-primary transition-colors">
                            <Share2 className="w-5 h-5 mr-2" /> <span className="uppercase font-bold text-sm">Share</span>
                        </button>
                    </div>
                </div>

                {/* Sidebar */}
                <div className="lg:col-span-4 space-y-8">
                    {/* Related Posts */}
                    <div className="bg-zinc-900 border border-white/5 p-6 rounded-sm">
                        <h3 className="text-xl font-bold text-white mb-6 uppercase border-l-4 border-primary pl-4">Related News</h3>
                        <div className="space-y-6">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="flex gap-4 group cursor-pointer">
                                    <div className="w-20 h-20 bg-zinc-800 flex-shrink-0 overflow-hidden">
                                        <img src={`https://images.unsplash.com/photo-${1500000000000 + i}?w=200`} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
                                    </div>
                                    <div>
                                        <h4 className="text-white font-bold leading-tight group-hover:text-primary transition-colors mb-1 line-clamp-2">
                                            Ancelotti praises team spirit after crucial win
                                        </h4>
                                        <span className="text-gray-500 text-xs">2 hours ago</span>
                                    </div>
                                </div>
                            ))}
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
