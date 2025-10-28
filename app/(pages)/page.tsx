import { VideoPage } from '@/src/components/Video';
import { Video } from '@/src/types/video';

async function getVideos(): Promise<Array<Video>> {
  try {
    const response = await fetch('http://localhost:3000/api/videos', {
      cache: 'no-cache',
    });

    if (!response.ok) {
      throw new Error('Failed to fetch videos');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching videos:', error);
    return [];
  }
}

export default async function Home() {
  const videos = await getVideos();

  return (
    <div className="container mx-auto px-4 py-8">
      <VideoPage videos={videos} />
    </div>
  );
}
