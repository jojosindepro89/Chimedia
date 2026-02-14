import Link from "next/link";
import { ArrowLeft, ExternalLink, Calendar } from "lucide-react";

export default async function NewsReadPage({ searchParams }: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) {
    const params = await searchParams;
    const url = params.url as string;
    const title = params.title as string;
    const source = params.source as string;

    if (!url || !title) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center text-white">
                <div className="text-center">
                    <h1 className="text-2xl font-bold mb-4">Article Not Found</h1>
                    <Link href="/news" className="text-primary hover:underline">Back to News</Link>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-black min-h-screen pb-20 pt-24">
            <div className="container mx-auto px-4 max-w-6xl">
                <Link href="/news" className="inline-flex items-center text-gray-400 hover:text-white mb-8 transition-colors">
                    <ArrowLeft className="w-4 h-4 mr-2" /> Back to News
                </Link>

                <article className="bg-zinc-900 border border-white/10 rounded-lg overflow-hidden shadow-2xl flex flex-col h-[85vh]">
                    <div className="p-6 border-b border-white/5 flex justify-between items-center bg-zinc-900">
                        <div>
                            <h1 className="text-xl md:text-2xl font-bold text-white leading-tight line-clamp-1">
                                {title}
                            </h1>
                            <div className="flex items-center space-x-4 text-sm text-gray-400 mt-2">
                                <span className="text-primary font-bold uppercase text-xs">{source || "News"}</span>
                                <span>•</span>
                                <span className="flex items-center"><Calendar className="w-3 h-3 mr-1" /> {new Date().toLocaleDateString()}</span>
                            </div>
                        </div>

                        <a
                            href={url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-gray-400 hover:text-white flex items-center bg-black/50 px-3 py-2 rounded"
                        >
                            Open Original <ExternalLink className="ml-1 w-3 h-3" />
                        </a>
                    </div>

                    {/* Iframe to keep user on site */}
                    <div className="flex-1 bg-white w-full relative">
                        <iframe
                            src={url}
                            className="w-full h-full absolute inset-0"
                            title="News Article"
                            sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
                        />
                    </div>
                </article>
            </div>
        </div>
    );
}
