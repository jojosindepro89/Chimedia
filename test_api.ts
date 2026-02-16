import { getLiveMatches, getFixtures } from "./src/lib/football-api";

async function test() {
    console.log("Testing getFixtures()...");
    const fixtures = await getFixtures();
    console.log(`getFixtures returned ${fixtures.length} matches.`);
    if (fixtures.length > 0) {
        console.log("Sample fixture status:", fixtures[0].status);
    }

    console.log("\nTesting getLiveMatches()...");
    const live = await getLiveMatches();
    console.log(`getLiveMatches returned ${live.length} matches.`);
    if (live.length > 0) {
        console.log("Sample live match:", live[0].league.name, live[0].home.name, "vs", live[0].away.name);
    }
}

test();
