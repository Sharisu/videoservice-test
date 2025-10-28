import { mockVideos } from '@/src/constants';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const sortedVideos = [...mockVideos].sort(
      (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );

    return NextResponse.json(sortedVideos, {
    //   headers: {
    //     'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
    //   },
    });
  } catch (error) {
    console.error('Error fetching videos:', error);
    return NextResponse.json(
      { error: 'Failed to fetch videos' },
      { status: 500 }
    );
  }
}
