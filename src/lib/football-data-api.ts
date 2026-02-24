import {Match} from "@/types/football";

const FOOTBALL_DATA_API_KEY = process.env.FOOTBALL_DATA_API_KEY;
const BASE_URL = "https://api.football-data.org/v4";

export async function getLiveScores(): Promise<Match[]> {
  if (!FOOTBALL_DATA_API_KEY) {
    console.warn("⚠️ FOOTBALL_DATA_API_KEY missing.");
    return [];
  }

  try {
    const response = await fetch(`${BASE_URL}/matches`, {
      headers : {
        "X-Auth-Token" : FOOTBALL_DATA_API_KEY,
      },
      next : {revalidate : 60}
    });

    if (!response.ok) {
      console.error("Football-Data API Error:", await response.text());
      return [];
    }

    const data = await response.json();
    const matches: any[] = data.matches || [];

    return matches.map(
        m => ({
          id : m.id,
          league : {
            name : m.competition.name,
            logo : m.competition.emblem,
            flag : ""
          },
          home : {name : m.homeTeam.name, logo : m.homeTeam.crest},
          away : {name : m.awayTeam.name, logo : m.awayTeam.crest},
          goals : {home : m.score.fullTime.home, away : m.score.fullTime.away},
          status : {
            short : m.status === "IN_PLAY" ? "LIVE" : m.status,
            elapsed : null,
            long : m.status
          },
          fixture :
              {date : m.utcDate, timestamp : new Date(m.utcDate).getTime()}
        }));
  } catch (error) {
    console.error("Failed to fetch live scores from Football-Data.org:", error);
    return [];
  }
}
