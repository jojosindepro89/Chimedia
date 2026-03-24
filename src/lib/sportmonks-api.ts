import { Match } from "@/types/football";

const SPORTMONKS_API_KEY = process.env.SPORTMONKS_API_KEY;
const BASE_URL = "https://soccer.sportmonks.com/api/v2.0";

export async function getLiveMatches(): Promise<Match[]> {
    if (!SPORTMONKS_API_KEY) {
        console.warn("⚠️ SportMonks API Key missing.");
        return [];
    }

    try {
        // v2.0 endpoint for live scores
        // includes localTeam, visitorTeam, and league data
        const url = `${BASE_URL}/livescores/now?api_token=${SPORTMONKS_API_KEY}&include=localTeam,visitorTeam,league`;

        const response = await fetch(url, {
            next: { revalidate: 30 } // Cache for 30 seconds
        });

        if (!response.ok) {
            console.error("SportMonks API Error:", await response.text());
            return [];
        }

        const json = await response.json();

        // Check for error in JSON response
        if (json.error) {
            console.error("SportMonks Error (getLiveMatches):", json.error);
            return [];
        }

        const matches: any[] = json.data || [];

        return matches.map((m: any) => ({
            id: m.id,
            league: {
                name: m.league?.data?.name || 'Unknown League',
                // fallback to a default logo if none is provided
                logo: m.league?.data?.logo_path || 'https://cdn.sportmonks.com/images/soccer/leagues/1.png',
                flag: m.league?.data?.logo_path || ''
            },
            home: {
                name: m.localTeam?.data?.name || 'Unknown Home',
                logo: m.localTeam?.data?.logo_path || ''
            },
            away: {
                name: m.visitorTeam?.data?.name || 'Unknown Away',
                logo: m.visitorTeam?.data?.logo_path || ''
            },
            goals: {
                home: m.scores?.localteam_score !== undefined ? m.scores.localteam_score : null,
                away: m.scores?.visitorteam_score !== undefined ? m.scores.visitorteam_score : null,
            },
            status: {
                short: m.time?.status || 'LIVE',
                elapsed: m.time?.minute || null,
                long: m.time?.status === 'LIVE' ? 'Live' : m.time?.status || 'Active'
            },
            fixture: {
                date: m.time?.starting_at?.date_time || new Date().toISOString(),
                timestamp: m.time?.starting_at?.timestamp || Math.floor(Date.now() / 1000)
            }
        }));

    } catch (error) {
        console.error("Failed to fetch SportMonks live matches:", error);
        return [];
    }
}

export async function getFixtures(date?: string): Promise<Match[]> {
    if (!SPORTMONKS_API_KEY) {
        return [];
    }

    const dateStr = date || new Date().toISOString().split('T')[0];

    try {
        const url = `${BASE_URL}/fixtures/date/${dateStr}?api_token=${SPORTMONKS_API_KEY}&include=localTeam,visitorTeam,league`;

        const response = await fetch(url, {
            next: { revalidate: 300 } // Cache for 5 minutes
        });

        if (!response.ok) return [];

        const json = await response.json();
        if (json.error) return [];

        const matches: any[] = json.data || [];

        return matches.map((m: any) => ({
            id: m.id,
            league: {
                name: m.league?.data?.name || 'Unknown League',
                // fallback to a default logo if none is provided
                logo: m.league?.data?.logo_path || 'https://cdn.sportmonks.com/images/soccer/leagues/1.png',
                flag: m.league?.data?.logo_path || ''
            },
            home: {
                name: m.localTeam?.data?.name || 'Unknown Home',
                logo: m.localTeam?.data?.logo_path || ''
            },
            away: {
                name: m.visitorTeam?.data?.name || 'Unknown Away',
                logo: m.visitorTeam?.data?.logo_path || ''
            },
            goals: {
                home: m.scores?.localteam_score !== undefined ? m.scores.localteam_score : null,
                away: m.scores?.visitorteam_score !== undefined ? m.scores.visitorteam_score : null,
            },
            status: {
                short: m.time?.status || 'NS',
                elapsed: m.time?.minute || null,
                long: m.time?.status === 'LIVE' ? 'Live' : m.time?.status || 'Not Started'
            },
            fixture: {
                date: m.time?.starting_at?.date_time || new Date().toISOString(),
                timestamp: m.time?.starting_at?.timestamp || Math.floor(Date.now() / 1000)
            }
        }));

    } catch (error) {
        console.error("Failed to fetch SportMonks fixtures:", error);
        return [];
    }
}

export async function getMatchDetails(id: string): Promise<Match | null> {
    if (!SPORTMONKS_API_KEY) {
        return null;
    }

    try {
        const url = `${BASE_URL}/fixtures/${id}?api_token=${SPORTMONKS_API_KEY}&include=localTeam,visitorTeam,league`;

        const response = await fetch(url, {
            next: { revalidate: 60 }
        });

        if (!response.ok) return null;

        const json = await response.json();
        if (json.error || !json.data) return null;

        const m: any = json.data;

        return {
            id: m.id,
            league: {
                name: m.league?.data?.name || 'Unknown League',
                logo: m.league?.data?.logo_path || 'https://cdn.sportmonks.com/images/soccer/leagues/1.png',
                flag: m.league?.data?.logo_path || ''
            },
            home: {
                name: m.localTeam?.data?.name || 'Unknown Home',
                logo: m.localTeam?.data?.logo_path || ''
            },
            away: {
                name: m.visitorTeam?.data?.name || 'Unknown Away',
                logo: m.visitorTeam?.data?.logo_path || ''
            },
            goals: {
                home: m.scores?.localteam_score !== undefined ? m.scores.localteam_score : null,
                away: m.scores?.visitorteam_score !== undefined ? m.scores.visitorteam_score : null,
            },
            status: {
                short: m.time?.status || 'NS',
                elapsed: m.time?.minute || null,
                long: m.time?.status === 'LIVE' ? 'Live' : m.time?.status || 'Not Started'
            },
            fixture: {
                date: m.time?.starting_at?.date_time || new Date().toISOString(),
                timestamp: m.time?.starting_at?.timestamp || Math.floor(Date.now() / 1000)
            }
        };

    } catch (error) {
        console.error("Failed to fetch SportMonks match details:", error);
        return null;
    }
}

export async function getPredictions(fixtureId: number | string): Promise<any> {
    // SportMonks prediction logic goes here. 
    // Returning null for now to avoid breaking the frontend if predictions aren't available on the API tier.
    return null;
}
