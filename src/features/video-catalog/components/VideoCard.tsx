import Link from 'next/link';

import { formatRelativeDate, formatViews } from '@/src/lib/utils';
import { Video } from '@/src/types/video';

import { VideoContainer } from './VideoContainer';

interface Props {
  video: Video;
}

export function VideoCard({ video }: Props) {
  return (
    <Link
      href={`/${video.id}`}
      className="group block cursor-pointer rounded-lg"
    >
      <VideoContainer video={video} />

      <div className="flex flex-col gap-1 p-4">
        <h3 className="group-hover:text-accent text-foreground line-clamp-2 font-medium transition-colors">
          {video.title}
        </h3>

        <p className="text-secondary-foreground text-sm">{video.author}</p>

        <div className="text-secondary-foreground flex items-center gap-2 text-xs">
          {video.views && <span>{formatViews(video.views)} views</span>}
          <span>•</span>
          <span>{formatRelativeDate(video.publishedAt)}</span>
        </div>
      </div>
    </Link>
  );
}
