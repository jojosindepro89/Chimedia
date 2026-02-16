import { getFixtures } from "@/lib/football-api";
import LiveScoresClient from "./LiveScoresClient";

export const revalidate = 60;

export default async function LiveScoresPage() {
    const matches = await getFixtures();
    return <LiveScoresClient initialMatches={matches} />;
}
