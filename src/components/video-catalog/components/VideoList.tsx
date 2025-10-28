'use client';

import { CatIcon, RefreshCwIcon } from 'lucide-react';

import { useFilters } from '@/src/hooks/useFilters';
import { useVideos } from '@/src/hooks/useVideos';

import { VideoCard } from './VideoCard';
import { VideoCardSkeleton } from './VideoCardSkeleton';

export function VideoList() {
  const { search, duration } = useFilters();

  const {
    data: videos,
    isLoading,
    isFetching,
    refetch,
    error,
  } = useVideos({
    search: search || undefined,
    duration: duration !== 'all' ? duration : undefined,
  });

  const handleRefresh = () => {
    refetch();
  };

  if (error) {
    return (
      <div className="flex flex-col items-center gap-4">
        <div className="flex flex-row items-center gap-2">
          <p className="text-gray text-gray-500">Oops! Cannot load videos. Please try again.</p>
          <CatIcon className="h-6 w-6" />
        </div>
        <button
          className="group hover:text-accent flex cursor-pointer flex-row items-center gap-2 rounded-md bg-gray-200 px-4 py-2 text-black"
          onClick={handleRefresh}
        >
          Refresh
          <RefreshCwIcon className="h-4 w-4 transition-transform duration-300 group-hover:rotate-180" />
        </button>
      </div>
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
