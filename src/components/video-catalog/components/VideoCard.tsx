import { PlayIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { formatDuration, formatRelativeDate, formatViews } from '@/src/lib/utils';
import { Video } from '@/src/types/video';

interface Props {
  video: Video;
}

export function VideoCard({ video }: Props) {
  return (
    <Link
      href={`/details/${video.id}`}
      className="group block cursor-pointer"
    >
      <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-gray-200">
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

        <div className="bg-opacity-80 absolute right-2 bottom-2 rounded bg-black px-2 py-1 text-xs text-white">
          {formatDuration(video.durationSec)}
        </div>
      </div>

      <div className="flex flex-col gap-1 p-4">
        <h3 className="group-hover:text-accent line-clamp-2 font-medium text-gray-900 transition-colors">
          {video.title}
        </h3>

        <p className="text-sm text-gray-600">{video.author}</p>

        <div className="flex items-center gap-2 text-xs text-gray-500">
          {video.views && <span>{formatViews(video.views)} views</span>}
          <span>•</span>
          <span>{formatRelativeDate(video.publishedAt)}</span>
        </div>
      </div>
    </Link>
  );
}
