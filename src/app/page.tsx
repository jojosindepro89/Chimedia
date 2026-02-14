import Link from "next/link";
import { ArrowRight, Trophy, TrendingUp, Calendar, Shield } from "lucide-react";
import NewsFeed from "@/components/NewsFeed";
import UpcomingFixtures from "@/components/UpcomingFixtures";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-black">
      {/* Hero Section */}
      <section className="relative h-[85vh] w-full flex items-center justify-center overflow-hidden">
        {/* Background Image / Gradient */}
        <div
          className="absolute inset-0 bg-cover bg-center z-0"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1522778119026-d647f0565c6a?q=80&w=2070&auto=format&fit=crop')" }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
        </div>

        {/* Content */}
        <div className="relative z-10 text-center container mx-auto px-4">
          <h1 className="text-5xl md:text-7xl font-bold uppercase tracking-tighter text-white mb-6 animate-fade-in-up">
            <span className="text-primary">Chigozie</span> Media House
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-2xl mx-auto font-light">
            Premium Football News, Verified Transfer Updates & Expert Betting Predictions.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/news"
              className="px-8 py-3 bg-primary text-black font-bold uppercase tracking-wider rounded-sm hover:bg-yellow-500 transition-all transform hover:scale-105"
            >
              View News
            </Link>
            <Link
              href="/predictions"
              className="px-8 py-3 bg-transparent border-2 border-white text-white font-bold uppercase tracking-wider rounded-sm hover:bg-white hover:text-black transition-all transform hover:scale-105"
            >
              Get Predictions
            </Link>
          </div>
        </div>

        {/* Breaking News Ticker */}
        <div className="absolute bottom-0 left-0 right-0 bg-primary/90 text-black py-2 overflow-hidden">
          <div className="container mx-auto px-4 flex items-center">
            <span className="font-bold uppercase tracking-wide mr-4 bg-black text-primary px-2 py-1 text-xs rounded">Breaking</span>
            <div className="whitespace-nowrap animate-marquee flex-1">
              <span className="mx-4">Mbappe scores hat-trick in thrilling Classico.</span>
              <span className="mx-4">•</span>
              <span className="mx-4">Transfer Rumour: Osimhen linked with Chelsea move.</span>
              <span className="mx-4">•</span>
              <span className="mx-4">Champions League Draw: Arsenal faces Bayern Munich.</span>
            </div>
          </div>
        </div>
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
