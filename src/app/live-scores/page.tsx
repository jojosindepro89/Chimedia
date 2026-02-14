import { getFixtures } from "@/lib/football-api";
import LiveScoresClient from "./LiveScoresClient";

export const revalidate = 60;

export default async function LiveScoresPage() {
    const matches = await getFixtures();
    // Filter out matches that are currently LIVE
    // Status short codes for LIVE: "1H", "HT", "2H", "ET", "BT", "P", "SUSP", "INT", "LIVE"
    const liveStatuses = ["1H", "HT", "2H", "ET", "BT", "P", "SUSP", "INT", "LIVE"];
    const nonLiveMatches = matches.filter(m => !liveStatuses.includes(m.status.short));

    return <LiveScoresClient initialMatches={nonLiveMatches} />;
}
