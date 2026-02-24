import { notFound } from "next/navigation";
import { Match, League } from "@/types/football";

const RAPIDAPI_KEY = process.env.RAPIDAPI_KEY;
const API_SPORTS_KEY = process.env.API_SPORTS_KEY;
const BASE_URL = "https://v3.football.api-sports.io";

console.log("API_SPORTS_KEY present:", !!API_SPORTS_KEY);


function getHeaders() {
    if (API_SPORTS_KEY) {
        return {
            "x-apisports-key": API_SPORTS_KEY,
        };
    }
    if (RAPIDAPI_KEY) {
        return {
            "x-rapidapi-key": RAPIDAPI_KEY,
            "x-rapidapi-host": "v3.football.api-sports.io"
        };
    }
    return null;
}

export async function getLiveMatches(): Promise<Match[]> {
    const headers = getHeaders();
    if (!headers) {
        console.warn("⚠️ API Key missing.");
        return [];
    }

    try {
        const response = await fetch(`${BASE_URL}/fixtures?live=all`, {
            headers: headers as any,
            next: { revalidate: 60 } // Cache for 60 seconds
        });

        if (!response.ok) {
            console.error("API Error:", await response.text());
            return [];
        }

        const data = await response.json();

        if (data.errors && Object.keys(data.errors).length > 0) {
            console.error("API-Sports Error (getLiveMatches):", data.errors);
            return [];
        }

        const matches: any[] = data.response || [];

        return matches.map(m => ({
            id: m.fixture.id,
            league: {
                name: m.league.name,
                logo: m.league.logo,
                flag: m.league.flag
            },
            home: {
                name: m.teams.home.name,
                logo: m.teams.home.logo
            },
            away: {
                name: m.teams.away.name,
                logo: m.teams.away.logo
            },
            goals: {
                home: m.goals.home,
                away: m.goals.away
            },
            status: {
                short: m.fixture.status.short,
                elapsed: m.fixture.status.elapsed,
                long: m.fixture.status.long
            },
            fixture: {
                date: m.fixture.date,
                timestamp: m.fixture.timestamp
            }
        }));

    } catch (error) {
        console.error("Failed to fetch live matches:", error);
        return [];
    }
}

export async function getLeagues(): Promise<League[]> {
    const headers = getHeaders();
    if (!headers) {
        return [];
    }

    try {
        const response = await fetch(`${BASE_URL}/leagues?current=true`, {
            headers: headers as any,
            next: { revalidate: 86400 } // Cache for 24 hours
        });

        if (!response.ok) return [];

        const data = await response.json();
        const leagues: any[] = data.response || [];

        // Filter for top 5 + UCL
        const topLeagueIds = [39, 140, 78, 135, 61, 2];
        const filtered = leagues.filter(l => topLeagueIds.includes(l.league.id));

        return filtered.map(l => ({
            id: l.league.id,
            name: l.league.name,
            country: l.country.name,
            logo: l.league.logo,
            flag: l.country.flag
        }));

    } catch (error) {
        console.error("Failed to fetch leagues:", error);
        return [];
    }
}

export async function getFixtures(date?: string): Promise<Match[]> {
    const headers = getHeaders();
    if (!headers) {
        return [];
    }

    const dateStr = date || new Date().toISOString().split('T')[0];

    try {
        const response = await fetch(`${BASE_URL}/fixtures?date=${dateStr}`, {
            headers: headers as any,
            next: { revalidate: 300 } // Cache for 5 minutes
        });

        if (!response.ok) return [];

        const data = await response.json();

        if (data.errors && Object.keys(data.errors).length > 0) {
            console.error("API-Sports Error (getFixtures):", data.errors);
            return [];
        }

        const matches: any[] = data.response || [];

        const topLeagueIds = [39, 140, 78, 135, 61, 2, 3, 9, 45, 48, 143, 137, 529, 530, 531, 547, 556]; // Expanded list
        const filtered = matches.filter(m => topLeagueIds.includes(m.league.id));

        return filtered.map(m => ({
            id: m.fixture.id,
            league: {
                name: m.league.name,
                logo: m.league.logo,
                flag: m.league.flag
            },
            home: {
                name: m.teams.home.name,
                logo: m.teams.home.logo
            },
            away: {
                name: m.teams.away.name,
                logo: m.teams.away.logo
            },
            goals: {
                home: m.goals.home,
                away: m.goals.away
            },
            status: {
                short: m.fixture.status.short,
                elapsed: m.fixture.status.elapsed,
                long: m.fixture.status.long
            },
            fixture: {
                date: m.fixture.date,
                timestamp: m.fixture.timestamp
            }
        }));

    } catch (error) {
        console.error("Failed to fetch fixtures:", error);
        return [];
    }
}

export async function getMatchDetails(id: string): Promise<Match | null> {
    const headers = getHeaders();
    if (!headers) {
        return null;
    }

    try {
        const response = await fetch(`${BASE_URL}/fixtures?id=${id}`, {
            headers: headers as any,
            next: { revalidate: 60 }
        });

        if (!response.ok) return null;

        const data = await response.json();

        if (data.errors && Object.keys(data.errors).length > 0) {
            console.error("API-Sports Error (getMatchDetails):", data.errors);
            return null;
        }

        const m = data.response[0];

        if (!m) return null;

        return {
            id: m.fixture.id,
            league: {
                name: m.league.name,
                logo: m.league.logo,
                flag: m.league.flag
            },
            home: {
                name: m.teams.home.name,
                logo: m.teams.home.logo
            },
            away: {
                name: m.teams.away.name,
                logo: m.teams.away.logo
            },
            goals: {
                home: m.goals.home,
                away: m.goals.away
            },
            status: {
                short: m.fixture.status.short,
                elapsed: m.fixture.status.elapsed,
                long: m.fixture.status.long
            },
            fixture: {
                date: m.fixture.date,
                timestamp: m.fixture.timestamp
            }
        };
    } catch (error) {
        console.error("Failed to fetch match details:", error);
        return null;
    }
}

export async function getPredictions(fixtureId: number): Promise<any> {
    const headers = getHeaders();
    if (!headers) return null;

    try {
        const response = await fetch(`${BASE_URL}/predictions?fixture=${fixtureId}`, {
            headers: headers as any,
            next: { revalidate: 86400 } // Cache for 24 hours (predictions don't change much)
        });

        if (!response.ok) return null;

        const data = await response.json();

        if (data.errors && Object.keys(data.errors).length > 0) {
            console.error("API-Sports Error (getPredictions):", data.errors);
            return null;
        }

        return data.response[0] || null;
    } catch (error) {
        console.error("Failed to fetch predictions:", error);
        return null;
    }
}
