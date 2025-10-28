import { NextResponse } from 'next/server';

import { mockVideos } from '@/src/constants';

export async function GET() {
  try {
    const sortedVideos = [...mockVideos].sort(
      (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
    );

    return NextResponse.json(sortedVideos, { status: 200 });
  } catch (error) {
    console.error('Error fetching videos:', error);
    return NextResponse.json({ error: 'Failed to fetch videos' }, { status: 500 });
  }
}
