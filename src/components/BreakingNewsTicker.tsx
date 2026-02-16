"use client";

import { useEffect, useState } from "react";

interface NewsItem {
    id: string;
    title: string;
}

export default function BreakingNewsTicker({ initialNews }: { initialNews: NewsItem[] }) {
    const [news, setNews] = useState(initialNews);

    return (
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-r from-primary/90 to-yellow-600/90 text-black py-3 overflow-hidden border-t border-yellow-400 backdrop-blur-md">
            <div className="container mx-auto px-4 flex items-center">
                <span className="font-black uppercase tracking-widest mr-6 bg-black text-white px-3 py-1 text-xs rounded shadow-lg transform -skew-x-12">Breaking</span>
                <div className="whitespace-nowrap animate-marquee flex-1 text-sm font-bold uppercase tracking-wide">
                    {news.map((item, index) => (
                        <span key={item.id} className="inline-flex items-center">
                            <span className="mx-8">{item.title}</span>
                            <span className="mx-4 text-white/50">•</span>
                        </span>
                    ))}
                    {news.length === 0 && (
                        <span className="mx-8">Welcome to Chigozie Media House - Your Home for Premium Sports Content</span>
                    )}
                </div>
            </div>
        </div>
    );
}
