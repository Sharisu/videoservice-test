'use client';

import { useFilters } from '@/src/hooks/useFilters';
import { useVideos } from '@/src/hooks/useVideos';
import { Video, VideoDuration } from '@/src/types/video';

import { VideoCard } from './VideoCard';
import { VideoCardSkeleton } from './VideoCardSkeleton';
import { VideoError } from './VideoError';

interface VideoListProps {
  initialVideos?: Array<Video>;
}

export function VideoList({ initialVideos }: VideoListProps) {
  const { search, duration, hasActiveFilters, onReset: onResetFilters } = useFilters();

  const {
    data: videos,
    isLoading,
    isFetching,
    refetch,
    error,
  } = useVideos({
    initialVideos,
    search: search || undefined,
    duration: duration !== 'all' ? (duration as VideoDuration) : undefined,
  });

  if (error && !isFetching) {
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
      <div className="flex flex-col items-center gap-6">
        <p className="text-secondary-foreground text-lg">No videos found</p>
        {hasActiveFilters && (
          <div className="flex flex-col items-center gap-2">
            <p className="text-muted-foreground text-sm">Try adjusting your filters</p>
            <button
              onClick={onResetFilters}
              className="hover:text-accent bg-muted text-foreground flex items-center gap-2 rounded-md px-4 py-2 transition-colors"
            >
              Reset filters
            </button>
          </div>
        )}
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
