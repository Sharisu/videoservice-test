import { formatDate, formatDuration, formatViews } from '@/src/lib/utils';
import { Video } from '@/src/types/video';

interface Props {
  video: Video;
}

export function VideoDetailsCard({ video }: Props) {
  return (
    <div>
      <div className="flex flex-col overflow-hidden rounded-lg bg-white shadow-xl">
        <div className="relative aspect-video bg-gray-200">
          <img
            src={video.thumbnail}
            alt={video.title}
            className="h-full w-full object-cover"
          />
          <div className="bg-opacity-75 absolute right-4 bottom-4 rounded bg-black px-2 py-1 text-sm text-white">
            {formatDuration(video.durationSec)}
          </div>
        </div>

        <div className="flex flex-col gap-4 pt-2 pr-6 pb-6 pl-6">
          <div>
            <div className="flex flex-wrap items-center gap-2 text-sm text-gray-600">
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
                <h2 className="text-lg font-semibold text-gray-900">Description</h2>
                <p className="leading-relaxed whitespace-pre-wrap text-gray-700">{video.description}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
