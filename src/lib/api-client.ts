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

export async function getVideoById(id: string): Promise<Video> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  const response = await fetch(`${baseUrl}/api/videos/${id}`);

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error('Video not found');
    }
    throw new Error('Failed to fetch video');
  }

  return response.json();
}
