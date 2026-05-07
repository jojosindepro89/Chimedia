const API_KEY = process.env.NEWS_API_KEY;

export interface NewsArticle {
    source: {
        id: string | null;
        name: string;
    };
    author: string | null;
    title: string;
    description: string;
    url: string;
    urlToImage: string | null;
    publishedAt: string;
    content: string;
}

export async function getFootballNews(): Promise<NewsArticle[]> {
    try {
        const rssUrl = "https://feeds.bbci.co.uk/sport/football/rss.xml";
        const response = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rssUrl)}`, {
            next: { revalidate: 300 } // Cache for 5 minutes
        });

        if (!response.ok) {
            console.error("RSS API Error:", await response.text());
            return [];
        }

        const data = await response.json();
        
        if (data.status !== "ok") {
            console.error("RSS parse error:", data.message);
            return [];
        }

        const items: any[] = data.items || [];

        return items.map(item => ({
            source: { id: "bbc-sport", name: "BBC Sport" },
            author: item.author || "BBC Sport",
            title: item.title,
            description: item.description || "Click to read the full story on BBC Sport.",
            url: item.link,
            urlToImage: item.thumbnail || item.enclosure?.link || "https://images.unsplash.com/photo-1518605368461-1e1e38ce81ba?q=80&w=2070&auto=format&fit=crop",
            publishedAt: item.pubDate,
            content: item.content || item.description || ""
        }));
    } catch (error) {
        console.error("Failed to fetch news:", error);
        return [];
    }
}
