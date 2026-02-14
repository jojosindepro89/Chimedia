import { NextResponse } from 'next/server';

export async function GET() {
    const check = {
        football_key_set: !!process.env.API_SPORTS_KEY,
        news_key_set: !!process.env.NEWS_API_KEY,
        cloudinary_cloud_set: !!process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
        cloudinary_key_set: !!process.env.CLOUDINARY_API_KEY,
        database_url_set: !!process.env.POSTGRES_PRISMA_URL,
        nextauth_url_set: !!process.env.NEXTAUTH_URL,
        node_env: process.env.NODE_ENV,
        timestamp: new Date().toISOString()
    };

    return NextResponse.json(check);
}
