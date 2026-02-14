const API_KEY = process.env.NEWS_API_KEY;
const BASE_URL = "https://newsapi.org/v2";

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
    if (!API_KEY) {
        console.warn("⚠️ NEWS_API_KEY missing.");
        return [];
    }

    try {
        // Fetch top headlines for football/soccer
        // q=football OR soccer
        const response = await fetch(`${BASE_URL}/everything?q=football&language=en&sortBy=publishedAt&pageSize=20&apiKey=${API_KEY}`, {
            next: { revalidate: 60 } // Cache for 60 seconds
        });

        if (!response.ok) {
            console.error("News API Error:", await response.text());
            return [];
        }

        const data = await response.json();
        return data.articles || [];

    } catch (error) {
        console.error("Failed to fetch news:", error);
        return [];
    }
}
