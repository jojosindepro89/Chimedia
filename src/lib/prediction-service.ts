import { getFixtures, getPredictions } from "./football-api";
import { Match } from "@/types/football";

export interface DailyTip {
    id: string;
    match: string;
    league: string;
    market: string;
    selection: string;
    odds: number;
    confidence: number; // 0-100
    time: string;
    status: "PENDING" | "WON" | "LOST";
    isPremium: boolean;
    isBanker: boolean;
    analysis: string | null;
}

export async function getDailyPredictions(): Promise<{ free: DailyTip[], premium: DailyTip[] }> {
    try {
        // 1. Get today's fixtures
        const matches = await getFixtures();

        // 2. Filter for major leagues / interesting matches to save API calls
        const topLeagues = ["Premier League", "La Liga", "Bundesliga", "Serie A", "Ligue 1", "UEFA Champions League"];

        const candidates = matches
            .filter(m => topLeagues.includes(m.league.name) && m.status.short === "NS")
            .slice(0, 5); // Limit to 5 predictions to save quota

        if (candidates.length === 0) {
            console.log("No real candidates for predictions today.");
            return { free: [], premium: [] };
        }

        const tips: DailyTip[] = [];

        // 3. Fetch predictions for each candidate
        const predictionPromises = candidates.map(async (match) => {
            const predData = await getPredictions(match.id);
            if (!predData) return null;

            const prediction = predData.predictions;
            const advice = prediction.advice;
            const percent = prediction.percent;
            const winner = prediction.winner;

            let selection = "Unknown";
            let market = "Result";
            let confidence = 50;

            if (advice.includes("Winner")) {
                market = "Match Winner";
                selection = winner.name;
            } else if (advice.includes("goals")) {
                market = "Goals";
                selection = advice;
            } else if (advice.includes("Double chance")) {
                market = "Double Chance";
                selection = advice.split(" : ")[1] || advice;
            } else {
                selection = advice;
            }

            const values = Object.values(percent).map((v: any) => parseInt(v?.replace("%", "") || "0"));
            confidence = Math.max(...values);

            const simulatedOdds = 1 + (100 / confidence);

            const isPremium = confidence >= 60;
            const isBanker = confidence >= 80;

            return {
                id: match.id.toString(),
                match: `${match.home.name} vs ${match.away.name}`,
                league: match.league.name,
                market: market,
                selection: selection,
                odds: parseFloat(simulatedOdds.toFixed(2)),
                confidence: confidence,
                time: new Date(match.fixture.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                status: "PENDING",
                isPremium: isPremium,
                isBanker: isBanker,
                analysis: prediction.comment || null
            } as DailyTip;
        });

        const results = await Promise.all(predictionPromises);
        const validTips = results.filter(t => t !== null) as DailyTip[];

        // Sort: Free vs Premium
        return {
            free: validTips.filter(t => !t.isPremium),
            premium: validTips.filter(t => t.isPremium)
        };
    } catch (error) {
        console.error("Error in getDailyPredictions:", error);
        return { free: [], premium: [] };
    }
}
