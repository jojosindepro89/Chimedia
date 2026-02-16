import { getFixtures, getPredictions, Match } from "./football-api";

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
    // 1. Get today's fixtures
    const matches = await getFixtures();

    // 2. Filter for major leagues / interesting matches to save API calls
    //    (API-Sports Free Tier limit is 100/day. We must be careful.)
    //    Let's take top 5 matches from major leagues.
    const topLeagues = ["Premier League", "La Liga", "Bundesliga", "Serie A", "Ligue 1", "UEFA Champions League"];

    // Prioritize major leagues, then fallback to others
    const candidates = matches
        .filter(m => topLeagues.includes(m.league.name) && m.status.short === "NS") // Only Not Started
        .slice(0, 10); // Limit to 10 predictions per day to stay within quota

    if (candidates.length === 0) {
        return { free: [], premium: [] };
    }

    const tips: DailyTip[] = [];

    // 3. Fetch predictions for each candidate
    //    Executes in parallel
    const predictionPromises = candidates.map(async (match) => {
        const predData = await getPredictions(match.id);
        if (!predData) return null;

        // 4. Transform API data into a Tip
        //    (Logic to determine market/selection/confidence)
        const prediction = predData.predictions;
        const advice = prediction.advice; // e.g., "Combo Double chance : Draw or Manchester City and -3.5 goals"
        const percent = prediction.percent; // { home: "10%", draw: "40%", away: "50%" }
        const winner = prediction.winner; // { name: "Away Team", comment: "..." }

        // Simple parsing logic (can be refined)
        let selection = "Unknown";
        let market = "Result";
        let confidence = 50;

        // Try to parse Advice
        if (advice.includes("Winner")) {
            market = "Match Winner";
            selection = winner.name;
        } else if (advice.includes("goals")) {
            market = "Goals";
            selection = advice; // e.g. "Over 2.5 goals"
        } else if (advice.includes("Double chance")) {
            market = "Double Chance";
            selection = advice.split(" : ")[1] || advice;
        } else {
            selection = advice;
        }

        // Calculate confidence from percentages
        // Max value of home/draw/away
        const values = Object.values(percent).map((v: any) => parseInt(v?.replace("%", "") || "0"));
        confidence = Math.max(...values);

        // Fallback odds (API doesn't always give odds in prediction endpoint, usually need Odds endpoint)
        // We'll simulate odds based on confidence for now, or use a default range
        // High confidence = Low odds
        const simulatedOdds = 1 + (100 / confidence);

        // 5. Determine if Premium or Free
        //    Logic: High Confidence (> 60%) OR Big Match = Premium? 
        //    User request: "Some fall on premium, some free"
        //    Let's random split or logic split.
        //    Let's say > 70% confidence is Premium (Banker), < 70% is Free (Riskier/Value).
        //    Actually, usually Premium = The Good Stuff. So High Confidence = Premium.
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
}
