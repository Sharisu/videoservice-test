'use client';

import { useSearchParams } from 'next/navigation';

import { useVideos } from '@/src/hooks/useVideos';
import { VideoDuration } from '@/src/types/video';

import { VideoCard } from './VideoCard';
import { VideoCardSkeleton } from './VideoCardSkeleton';
import { VideoError } from './VideoError';

export function VideoList() {
  const searchParams = useSearchParams();
  const search = searchParams.get('search') || undefined;
  const duration = (searchParams.get('duration') as VideoDuration) || undefined;

  const {
    data: videos,
    isLoading,
    isFetching,
    refetch,
    error,
  } = useVideos({
    search,
    duration: duration !== 'all' ? duration : undefined,
  });

  if (error) {
    return (
      <VideoError
        error={error}
        onRefresh={refetch}
      />
    );
  }

  if (isLoading || isFetching) {
    return (
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 3 }).map((_, index) => (
          <VideoCardSkeleton key={index} />
        ))}
      </div>
    );
  }

  if (!videos || videos.length === 0) {
    return (
      <div className="text-center">
        <p className="text-secondary-foreground text-lg">No videos found</p>
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
