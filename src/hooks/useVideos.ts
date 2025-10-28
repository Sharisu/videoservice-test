import { useQuery } from '@tanstack/react-query';

import { getVideos } from '@/src/lib/api-client';
import { VideoDuration } from '@/src/types/video';

interface Props {
  search?: string;
  duration?: VideoDuration;
}

export function useVideos({ search, duration }: Props = {}) {
  return useQuery({
    queryKey: ['videos', { search, duration }],
    queryFn: () => getVideos({ search, duration }),
  });
}
