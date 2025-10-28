import Link from 'next/link';

import { VideoContainer } from '@/src/components/shared';
import { formatRelativeDate, formatViews } from '@/src/lib/utils';
import { Video } from '@/src/types/video';

interface Props {
  video: Video;
}

export function VideoCard({ video }: Props) {
  return (
    <Link
      href={`/${video.id}`}
      className="group block cursor-pointer"
    >
      <VideoContainer video={video} />

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
