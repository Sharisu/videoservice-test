import { PlayIcon } from 'lucide-react';
import Image from 'next/image';

import { formatDuration } from '@/src/lib/utils';
import { Video } from '@/src/types/video';

interface Props {
  video: Video;
}

export function VideoContainer({ video }: Props) {
  return (
    <div className="bg-muted relative aspect-video w-full overflow-hidden rounded-lg">
      <Image
        src={video.thumbnail}
        alt={video.title}
        fill
        className="object-cover transition-transform duration-300 group-hover:scale-105"
        sizes="(max-width: 768px) 100vw, (max-width: 1199px) 50vw, 33vw"
        loading="lazy"
      />

      <div className="absolute inset-0 flex items-center justify-center">
        <div className="scale-75 opacity-0 transition-all duration-300 group-hover:scale-100 group-hover:opacity-100">
          <PlayIcon
            className="h-16 w-16 text-white"
            fill="black"
            fillOpacity={0.4}
          />
        </div>
      </div>

      <div className="bg-opacity-80 absolute right-2 bottom-2 rounded-md bg-black px-2 py-1 text-xs text-white">
        {formatDuration(video.durationSec)}
      </div>
    </div>
  );
}
