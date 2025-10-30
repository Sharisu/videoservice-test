'use client';

import { useFilters } from '@/src/hooks/useFilters';
import { useVideos } from '@/src/hooks/useVideos';
import { Video, VideoDuration } from '@/src/types/video';

import { VideoCard } from './VideoCard';
import { VideoCardSkeleton } from './VideoCardSkeleton';
import { VideoEmptyState } from './VideoEmptyState';

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
      <VideoEmptyState
        title="Oops! Cannot load videos. Please try again"
        description={error?.message}
        buttonText="Refresh"
        onButtonClick={refetch}
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
      <>
        {hasActiveFilters ? (
          <VideoEmptyState
            title="No videos found"
            description="Try adjusting your filters"
            buttonText="Reset filters"
            onButtonClick={onResetFilters}
          />
        ) : (
          <VideoEmptyState title="No videos found" />
        )}
      </>
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
