import { notFound } from "next/navigation";

const RAPIDAPI_KEY = process.env.RAPIDAPI_KEY;
const API_SPORTS_KEY = process.env.API_SPORTS_KEY;
const BASE_URL = "https://v3.football.api-sports.io";

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

export interface Match {
    id: number;
    league: {
        name: string;
        logo: string;
        flag: string;
    };
    home: {
        name: string;
        logo: string;
    };
    away: {
        name: string;
        logo: string;
    };
    goals: {
        home: number | null;
        away: number | null;
    };
    status: {
        short: string; // "1H", "FT", "NS", "LIVE"
        elapsed: number | null;
        long: string;
    };
    fixture: {
        date: string;
        timestamp: number;
    }
}

const MOCK_MATCHES: Match[] = [
    {
        id: 1,
        league: { name: "Premier League", logo: "", flag: "" },
        home: { name: "Man City", logo: "https://media.api-sports.io/football/teams/50.png" },
        away: { name: "Liverpool", logo: "https://media.api-sports.io/football/teams/40.png" },
        goals: { home: 2, away: 1 },
        status: { short: "LIVE", elapsed: 78, long: "Second Half" },
        fixture: { date: new Date().toISOString(), timestamp: Date.now() }
    },
    {
        id: 2,
        league: { name: "La Liga", logo: "", flag: "" },
        home: { name: "Real Madrid", logo: "https://media.api-sports.io/football/teams/541.png" },
        away: { name: "Barcelona", logo: "https://media.api-sports.io/football/teams/529.png" },
        goals: { home: 0, away: 0 },
        status: { short: "NS", elapsed: null, long: "Not Started" },
        fixture: { date: new Date().toISOString(), timestamp: Date.now() }
    }
];

export async function getLiveMatches(): Promise<Match[]> {
    const headers = getHeaders();
    if (!headers) {
        console.warn("⚠️ API Key missing. Serving mock football data.");
        return MOCK_MATCHES;
    }

    try {
        const response = await fetch(`${BASE_URL}/fixtures?live=all`, {
            headers: headers as any,
            next: { revalidate: 60 } // Cache for 60 seconds
        });

        if (!response.ok) {
            console.error("API Error:", await response.text());
            return MOCK_MATCHES;
        }

        const data = await response.json();
        const matches: any[] = data.response;

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
        return MOCK_MATCHES;
    }
}

export async function getLeagues(): Promise<League[]> {
    const headers = getHeaders();
    if (!headers) {
        return MOCK_LEAGUES;
    }

    try {
        // Fetching all leagues is too much (1000+). Let's fetch major ones by ID or just default to mock/static list if we want specific ones.
        // Better: Fetch specific IDs we care about.
        // Premier League: 39, La Liga: 140, Bundesliga: 78, Serie A: 135, Ligue 1: 61, UCL: 2
        const response = await fetch(`${BASE_URL}/leagues?current=true`, {
            headers: headers as any,
            next: { revalidate: 86400 } // Cache for 24 hours
        });

        if (!response.ok) return MOCK_LEAGUES;

        const data = await response.json();
        const leagues: any[] = data.response;

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
        return MOCK_LEAGUES;
    }
}

export async function getFixtures(date?: string): Promise<Match[]> {
    const headers = getHeaders();
    if (!headers) {
        return MOCK_MATCHES;
    }

    const dateStr = date || new Date().toISOString().split('T')[0];

    try {
        const response = await fetch(`${BASE_URL}/fixtures?date=${dateStr}`, {
            headers: headers as any,
            next: { revalidate: 300 } // Cache for 5 minutes
        });

        if (!response.ok) return MOCK_MATCHES;

        const data = await response.json();
        const matches: any[] = data.response;

        // Filter for major leagues only to avoid clutter?
        // Let's just return all and let the client filter if needed, or filter here to keep it clean.
        // For now, let's keep it simple and filter for major leagues + a few others if needed, but the user asked for "livescores" to be "fixtures".
        // Let's filter for the same top leagues as getLeagues to avoid 1000s of obscure matches.
        const topLeagueIds = [39, 140, 78, 135, 61, 2, 3, 9, 45, 48, 143, 137, 529, 530, 531, 547, 556]; // Expanded list
        // Actually, let's just show all for now or major ones.
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
        return MOCK_MATCHES;
    }
}

export async function getMatchDetails(id: string): Promise<Match | null> {
    const headers = getHeaders();
    if (!headers) {
        // Return a mock match if ID matches one of the mocks
        const mock = MOCK_MATCHES.find(m => m.id.toString() === id);
        return mock || MOCK_MATCHES[0];
    }

    try {
        const response = await fetch(`${BASE_URL}/fixtures?id=${id}`, {
            headers: headers as any,
            next: { revalidate: 60 }
        });

        if (!response.ok) return null;

        const data = await response.json();
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

export interface League {
    id: number;
    name: string;
    country: string;
    logo: string;
    flag: string;
}

const MOCK_LEAGUES: League[] = [
    { id: 39, name: "Premier League", country: "England", logo: "https://media.api-sports.io/football/leagues/39.png", flag: "https://media.api-sports.io/flags/gb.svg" },
    { id: 140, name: "La Liga", country: "Spain", logo: "https://media.api-sports.io/football/leagues/140.png", flag: "https://media.api-sports.io/flags/es.svg" },
    { id: 78, name: "Bundesliga", country: "Germany", logo: "https://media.api-sports.io/football/leagues/78.png", flag: "https://media.api-sports.io/flags/de.svg" },
    { id: 135, name: "Serie A", country: "Italy", logo: "https://media.api-sports.io/football/leagues/135.png", flag: "https://media.api-sports.io/flags/it.svg" },
    { id: 61, name: "Ligue 1", country: "France", logo: "https://media.api-sports.io/football/leagues/61.png", flag: "https://media.api-sports.io/flags/fr.svg" },
];
