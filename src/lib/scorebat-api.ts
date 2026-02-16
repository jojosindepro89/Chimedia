import { unstable_cache } from "next/cache";

export interface ScoreBatMatch {
    title: string;
    competition: string;
    matchviewUrl: string;
    competitionUrl: string;
    thumbnail: string;
    date: string;
    videos: {
        title: string;
        embed: string;
    }[];
}

export const getScoreBatMatches = unstable_cache(
    async (): Promise<ScoreBatMatch[]> => {
        try {
            const token = process.env.NEXT_PUBLIC_SCOREBAT_API_TOKEN;
            const url = `https://www.scorebat.com/video-api/v3/feed/?token=${token}`;

            const res = await fetch(url, { next: { revalidate: 60 } });

            if (!res.ok) {
                console.error("Failed to fetch ScoreBat matches:", res.statusText);
                return [];
            }

            const data = await res.json();
            return data.response || [];
        } catch (error) {
            console.error("Error fetching ScoreBat matches:", error);
            return [];
        }
    },
    ["scorebat-matches"],
    { revalidate: 60 }
);
