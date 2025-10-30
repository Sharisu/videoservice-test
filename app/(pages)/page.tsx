import { VideoCatalog } from '@/src/features/video-catalog';
import { Video } from '@/src/types';

async function getVideosFromAPI(): Promise<Array<Video>> {
  try {
    const baseUrl = 'http://localhost:3000';
    const response = await fetch(`${baseUrl}/api/videos`, {
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch videos');
    }

    return response.json();
  } catch (error) {
    console.error('Error fetching videos for SSR:', error);
    return [];
  }
}

export default async function Home() {
  const initialVideos = await getVideosFromAPI();

  return <VideoCatalog initialVideos={initialVideos} />;
}
