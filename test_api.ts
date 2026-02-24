import { getLiveMatches, getFixtures } from "./src/lib/football-api";
import { getDailyPredictions } from "./src/lib/prediction-service";

async function test() {
    console.log("--- Testing football-api.ts ---");
    console.log("Testing getFixtures()...");
    const fixtures = await getFixtures();
    console.log(`getFixtures returned ${fixtures.length} matches.`);

    console.log("\nTesting getLiveMatches()...");
    const live = await getLiveMatches();
    console.log(`getLiveMatches returned ${live.length} matches.`);

    console.log("\n--- Testing prediction-service.ts ---");
    console.log("Testing getDailyPredictions()...");
    const { free, premium } = await getDailyPredictions();
    console.log(`getDailyPredictions returned ${free.length} free and ${premium.length} premium tips.`);

    if (free.length > 0) {
        console.log("Sample free tip:", free[0].match, "-", free[0].selection);
    }
}

test();
