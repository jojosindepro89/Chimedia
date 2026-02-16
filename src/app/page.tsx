import Link from "next/link";
import { ArrowRight, Trophy, TrendingUp, Calendar, Shield } from "lucide-react";
import NewsFeed from "@/components/NewsFeed";
import UpcomingFixtures from "@/components/UpcomingFixtures";
import BreakingNewsTicker from "@/components/BreakingNewsTicker";
import { prisma } from "@/lib/prisma";

export default async function Home() {
  const latestNews = await prisma.post.findMany({
    where: { published: true },
    orderBy: { createdAt: 'desc' },
    take: 5,
    select: { id: true, title: true }
  });

  return (
    <div className="flex flex-col min-h-screen bg-black">
      {/* Hero Section */}
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-zinc-900">
        {/* Background Pattern */}
        <div className="absolute inset-0 z-0 opacity-20"
          style={{
            backgroundImage: `radial-gradient(#EAB308 1px, transparent 1px)`,
            backgroundSize: '30px 30px'
          }}>
        </div>

        {/* Background Image Overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center z-0 animate-pulse-slow opacity-40 mix-blend-overlay"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1522778119026-d647f0565c6a?q=80&w=2070&auto=format&fit=crop')" }}
        >
        </div>

        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent z-0" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-black/80 z-0" />

        {/* Content */}
        <div className="relative z-10 text-center container mx-auto px-4 mt-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-600/20 border border-red-500/50 text-red-500 font-bold uppercase text-xs tracking-widest mb-6 animate-pulse">
            <span className="w-2 h-2 rounded-full bg-red-500"></span> Live Updates
          </div>

          <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter text-white mb-6 animate-fade-in-up drop-shadow-2xl">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-yellow-200">Chigozie</span> <br /> Media House
          </h1>

          <p className="text-xl md:text-2xl text-gray-300 mb-10 max-w-3xl mx-auto font-light leading-relaxed">
            Your premium source for verified football news, expert betting predictions, and exclusive live match coverage.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link
              href="/membership"
              className="px-10 py-4 bg-primary text-black font-black uppercase tracking-widest rounded-sm hover:bg-yellow-400 transition-all transform hover:scale-105 shadow-[0_0_20px_rgba(234,179,8,0.3)] hover:shadow-[0_0_30px_rgba(234,179,8,0.5)]"
            >
              Join Premium
            </Link>
            <Link
              href="/predictions"
              className="px-10 py-4 bg-white/5 border border-white/20 backdrop-blur-sm text-white font-bold uppercase tracking-widest rounded-sm hover:bg-white hover:text-black transition-all transform hover:scale-105"
            >
              Free Predictions
            </Link>
          </div>
        </div>

        {/* Breaking News Ticker */}
        <BreakingNewsTicker initialNews={latestNews} />
      </section>

      {/* News Feed - Fetched Dynamically */}
      <section className="py-16 bg-zinc-900">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-3xl font-bold text-white uppercase tracking-tighter">Latest <span className="text-primary">Headlines</span></h2>
            <Link href="/news" className="text-primary font-bold uppercase text-sm hover:text-white transition-colors">View All News</Link>
          </div>

          <NewsFeed />
        </div>
      </section>

      {/* Fixtures Preview */}
      <section className="py-20 bg-black border-t border-white/5">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-12 uppercase tracking-tighter">Upcoming <span className="text-primary">Matches</span></h2>
          <UpcomingFixtures />
          <div className="mt-12">
            <Link href="/live-scores" className="px-8 py-3 bg-zinc-800 text-white hover:bg-white hover:text-black font-bold uppercase rounded-sm transition-colors cursor-pointer">
              View All Fixtures
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}

function FeatureCard({ icon, title, description, link, linkText, isPremium = false }: any) {
  return (
    <div className="bg-zinc-900/50 border border-white/5 p-8 rounded-sm hover:border-primary/50 transition-colors group">
      <div className="mb-6 bg-black w-16 h-16 flex items-center justify-center rounded-full border border-white/10 group-hover:border-primary transition-colors">
        {icon}
      </div>
      <h3 className="text-2xl font-bold text-white mb-4 uppercase">{title} {isPremium && <span className="text-xs bg-primary text-black px-2 py-1 rounded ml-2 align-middle">PRO</span>}</h3>
      <p className="text-gray-400 mb-8 leading-relaxed">
        {description}
      </p>
      <Link href={link} className="inline-flex items-center text-primary font-bold uppercase text-sm group-hover:text-white transition-colors">
        {linkText} <ArrowRight className="ml-2 w-4 h-4" />
      </Link>
    </div>
  );
}

function FixtureCard({ league, home, away, time, date }: any) {
  return (
    <div className="bg-zinc-900 border border-white/5 p-6 rounded hover:bg-zinc-800 transition-colors">
      <div className="text-xs text-primary uppercase font-bold mb-4 flex justify-between">
        <span>{league}</span>
        <span className="text-gray-500">{date}</span>
      </div>
      <div className="flex justify-between items-center mb-4">
        <span className="text-xl font-bold text-white">{home}</span>
        <span className="text-sm text-gray-400 font-mono">VS</span>
        <span className="text-xl font-bold text-white">{away}</span>
      </div>
      <div className="text-center border-t border-white/5 pt-4">
        <span className="text-sm text-gray-300 font-mono bg-black px-3 py-1 rounded">{time}</span>
      </div>
    </div>
  )
}
