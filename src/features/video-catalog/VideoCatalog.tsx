import { FiltersProvider } from '@/src/hooks/useFilters';
import { Video } from '@/src/types';

import { VideoHeader, VideoList } from './components';

interface Props {
  initialVideos?: Array<Video>;
}

export function VideoCatalog({ initialVideos }: Props) {
  return (
    <FiltersProvider>
      <div className="container mx-auto flex flex-col gap-8 px-4 py-8">
        <VideoHeader />
        <VideoList initialVideos={initialVideos} />
      </div>
    </FiltersProvider>
  );
}
