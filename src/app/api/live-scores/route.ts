import { getLiveMatches } from "@/lib/football-api";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const matches = await getLiveMatches();
        return NextResponse.json(matches);
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch live scores" }, { status: 500 });
    }
}
