import { formatDate, formatViews } from '@/src/lib/utils';
import { Video } from '@/src/types/video';

import { VideoContainer } from './VideoContainer';

interface Props {
  video: Video;
}

export function VideoDetailsCard({ video }: Props) {
  return (
    <div>
      <div className="group bg-card flex flex-col overflow-hidden rounded-lg shadow-xl">
        <VideoContainer video={video} />

        <div className="flex flex-col gap-4 p-4">
          <div>
            <div className="text-muted-foreground flex flex-wrap items-center gap-2 text-sm">
              <span className="font-medium">{video.author}</span>
              <span>•</span>
              <span>{formatDate(video.publishedAt)}</span>
              {video.views && (
                <>
                  <span>•</span>
                  <span>{formatViews(video.views)} views</span>
                </>
              )}
            </div>
          </div>

          <div className="flex flex-col">
            {video.description && (
              <div>
                <h2 className="text-foreground text-lg font-semibold">Description</h2>
                <p className="text-secondary-foreground leading-relaxed whitespace-pre-wrap">{video.description}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
