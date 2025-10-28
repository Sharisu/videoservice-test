import { Video } from '@/src/types/video';

import { VideoCard } from './VideoCard';

export interface VideoPageProps {
  videos: Array<Video>;
}

export function VideoPage({ videos }: VideoPageProps) {
  if (videos.length === 0) {
    return (
      <div className="text-center">
        <p className="text-lg text-gray-500">No videos found</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
      {videos.map(video => (
        <VideoCard
          key={video.id}
          video={video}
        />
      ))}
    </div>
  );
}
