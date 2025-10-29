import { useQuery } from '@tanstack/react-query';

import { getVideos } from '@/src/lib/api-client';
import { getErrorMode } from '@/src/lib/cookies';
import { VideoDuration } from '@/src/types/video';

interface Props {
  search?: string;
  duration?: VideoDuration;
}

export function useVideos({ search, duration }: Props = {}) {
  const errorMode = getErrorMode();

  return useQuery({
    queryKey: ['videos', { search, duration, errorMode }],
    queryFn: () => getVideos({ search, duration, errorMode }),
    retry: false,
  });
}
