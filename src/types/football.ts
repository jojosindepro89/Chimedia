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

export interface League {
    id: number;
    name: string;
    country: string;
    logo: string;
    flag: string;
}
