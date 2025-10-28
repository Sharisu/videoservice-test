import { Video, VideoDuration } from '@/src/types/video';

interface Args {
  search?: string;
  duration?: VideoDuration;
}

export async function getVideos({ search, duration }: Args): Promise<Video[]> {
  const params = new URLSearchParams();

  if (search) {
    params.set('search', search);
  }

  if (duration && duration !== 'all') {
    params.set('duration', duration);
  }

  const url = `/api/videos${params.toString() ? `?${params.toString()}` : ''}`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error('Failed to fetch videos');
  }

  return response.json();
}
