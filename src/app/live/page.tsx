import { AlertTriangle } from "lucide-react";

export const revalidate = 60;

export default function LiveHubPage() {
    return (
        <div className="bg-black min-h-screen pb-20">
            {/* Hero Section */}
            <div className="relative bg-zinc-900 border-b border-white/10 overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1522778119026-d647f0565c6a?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-20"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/50"></div>

                <div className="relative container mx-auto px-4 py-16 text-center">
                    <span className="inline-block py-1 px-3 rounded-full bg-red-600/20 text-red-500 font-bold uppercase text-xs mb-4 border border-red-600/50 animate-pulse">
                        Live Now
                    </span>
                    <h1 className="text-4xl md:text-6xl font-bold uppercase tracking-tighter text-white mb-4">
                        Watch <span className="text-primary">Live</span>
                    </h1>
                    <p className="text-gray-400 max-w-2xl mx-auto text-lg">
                        Stream live football matches from around the world.
                    </p>
                </div>
            </div>

            {/* Disclaimer & Stream */}
            <div className="container mx-auto px-4 mt-8">
                {/* Disclaimer Banner */}
                <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4 mb-8 flex items-start gap-4">
                    <AlertTriangle className="w-6 h-6 text-yellow-500 flex-shrink-0 mt-1" />
                    <div>
                        <h3 className="text-yellow-500 font-bold uppercase text-sm mb-1">Third-Party Content Disclaimer</h3>
                        <p className="text-gray-400 text-sm">
                            This content is hosted by a third-party provider (yallalive.sx).
                            <strong> Chigozie Media House</strong> is not responsible for the content, accuracy, reliability, or any advertisements displayed within the stream.
                        </p>
                    </div>
                </div>
            </div>

            {/* Iframe Container - Full Width */}
            <div className="w-full bg-zinc-900 border-y border-white/10 relative">
                <div className="aspect-video md:h-[85vh] w-full">
                    <iframe
                        src="https://yallalive.sx/page/87/"
                        className="w-full h-full border-0"
                        allowFullScreen
                        sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
                        loading="lazy"
                        title="Live Stream"
                    ></iframe>
                </div>
            </div>

            <div className="container mx-auto px-4 mt-8 text-center">
                <p className="text-gray-500 text-xs">
                    Having trouble with the stream? <a href="https://yallalive.sx/page/87/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Click here to open in new tab</a>.
                </p>
            </div>
        </div>
    );
}
