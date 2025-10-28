import { NextRequest, NextResponse } from 'next/server';

import { mockVideos } from '@/src/constants';
import { VideoDuration } from '@/src/types/video';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl;
    const searchQuery = searchParams.get('search')?.toLowerCase() || '';
    const durationFilter = (searchParams.get('duration') as VideoDuration) || 'all';

    await new Promise(resolve => setTimeout(resolve, 1000));

    let filteredVideos = [...mockVideos];

    if (searchQuery) {
      filteredVideos = filteredVideos.filter(video => video.title.toLowerCase().includes(searchQuery));
    }

    if (durationFilter && durationFilter !== 'all') {
      filteredVideos = filteredVideos.filter(video => {
        const durationMin = video.durationSec / 60;

        switch (durationFilter) {
          case 'short':
            return durationMin < 5;
          case 'medium':
            return durationMin >= 5 && durationMin <= 20;
          case 'long':
            return durationMin > 20;
          default:
            return true;
        }
      });
    }

    const sortedVideos = filteredVideos.sort(
      (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
    );

    return NextResponse.json(sortedVideos, { status: 200 });
  } catch (error) {
    console.error('Error fetching videos:', error);
    return NextResponse.json({ error: 'Failed to fetch videos' }, { status: 500 });
  }
}
