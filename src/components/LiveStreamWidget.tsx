'use client';

import { useEffect, useState } from 'react';
import { Play, Tv, AlertCircle } from 'lucide-react';

interface Video {
    title: string;
    embed: string;
}

interface MatchStream {
    title: string;
    competition: string;
    matchviewUrl: string;
    thumbnail: string;
    date: string;
    videos: Video[];
}

export default function LiveStreamWidget({ homeTeam, awayTeam, matchQuery }: { homeTeam?: string, awayTeam?: string, matchQuery?: string }) {
    const [streams, setStreams] = useState<MatchStream[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [selectedStream, setSelectedStream] = useState<MatchStream | null>(null);

    useEffect(() => {
        const fetchStreams = async () => {
            try {
                // Using the free API endpoint (Video API)
                const res = await fetch('https://www.scorebat.com/video-api/v3/feed/?token=' + (process.env.NEXT_PUBLIC_SCOREBAT_API_TOKEN || ''));
                /*
                   Note: Without a token, this might be rate limited or restricted.
                   The user is advised to get a free token.
                */

                if (!res.ok) throw new Error('Failed to load streams');

                const data = await res.json();
                const allStreams: MatchStream[] = data.response || [];

                let filtered = allStreams;

                if (homeTeam && awayTeam) {
                    const h = homeTeam.toLowerCase();
                    const a = awayTeam.toLowerCase();
                    filtered = allStreams.filter(s => {
                        const title = s.title.toLowerCase();
                        return title.includes(h) || title.includes(a);
                    });
                } else if (matchQuery) {
                    const query = matchQuery.toLowerCase();
                    filtered = allStreams.filter(s =>
                        s.title.toLowerCase().includes(query) ||
                        s.competition.toLowerCase().includes(query)
                    );
                }

                setStreams(filtered);
                if (filtered.length > 0) setSelectedStream(filtered[0]);

            } catch (err) {
                console.error(err);
                setError('Unable to load live streams at this time.');
            } finally {
                setLoading(false);
            }
        };

        fetchStreams();
    }, [matchQuery]);

    if (loading) return <div className="text-white/50 text-center py-12 animate-pulse">Loading streams...</div>;
    if (error) return (
        <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-6 text-center text-red-500">
            <AlertCircle className="w-8 h-8 mx-auto mb-2" />
            <p>{error}</p>
        </div>
    );

    if (streams.length === 0) return (
        <div className="bg-white/5 rounded-lg p-8 text-center border border-white/10">
            <Tv className="w-12 h-12 text-white/20 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">No Live Stream Available</h3>
            <p className="text-white/60 mb-6">
                {(homeTeam || matchQuery)
                    ? `We couldn't find a live broadcast for "${homeTeam || matchQuery} vs ${awayTeam || ''}".`
                    : "There are no live broadcasts available right now."}
            </p>
            <div className="bg-yellow-500/10 border border-yellow-500/20 p-4 rounded text-sm text-yellow-500">
                <strong>Note:</strong> Free streams are limited. Check back closer to kick-off.
            </div>
        </div>
    );

    return (
        <div className="space-y-6">
            {/* Main Player */}
            {selectedStream && (
                <div className="bg-black rounded-xl overflow-hidden shadow-2xl border border-white/10">
                    <div className="aspect-video w-full bg-zinc-900 relative">
                        {/* 
                            ScoreBat embeds are typically iframes. 
                            We need to dangerouslySetInnerHTML carefully or parse it.
                            The embed string is usually: <div style='...'><iframe ...></iframe></div>
                         */}
                        <div
                            className="w-full h-full [&>div]:w-full [&>div]:h-full [&>iframe]:w-full [&>iframe]:h-full"
                            dangerouslySetInnerHTML={{ __html: selectedStream.videos[0].embed }}
                        />
                    </div>
                    <div className="p-4 bg-zinc-900 border-t border-white/5 flex justify-between items-center">
                        <div>
                            <h3 className="text-lg font-bold text-white">{selectedStream.title}</h3>
                            <p className="text-sm text-primary">{selectedStream.competition}</p>
                        </div>
                        <div className="text-xs text-white/40">
                            Powered by ScoreBat
                        </div>
                    </div>
                </div>
            )}

            {/* Stream List (if multiple) */}
            {streams.length > 1 && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {streams.map((stream, idx) => (
                        <button
                            key={idx}
                            onClick={() => setSelectedStream(stream)}
                            className={`text-left p-3 rounded-lg border transition-all flex items-center gap-3 ${selectedStream === stream
                                ? 'bg-primary/10 border-primary text-white'
                                : 'bg-white/5 border-transparent hover:bg-white/10 text-gray-400'
                                }`}
                        >
                            <div className="w-10 h-10 rounded bg-black/50 overflow-hidden flex-shrink-0">
                                <img src={stream.thumbnail} alt="" className="w-full h-full object-cover opacity-75" />
                            </div>
                            <div className="min-w-0">
                                <div className="font-bold truncate text-sm">{stream.title}</div>
                                <div className="text-xs opacity-70 truncate">{stream.competition}</div>
                            </div>
                            {selectedStream === stream && <Play className="w-4 h-4 ml-auto fill-current text-primary" />}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
