'use client';

import { useRouter } from 'next/navigation';

import { PageBreadcrumbs } from '@/src/components/ui';
import { Video } from '@/src/types/video';

import { VideoDetailsCard } from './components';

interface Props {
  video: Video;
}

export function VideoDetails({ video }: Props) {
  const router = useRouter();
  const handleBack = () => {
    router.push('/');
  };

  return (
    <div className="flex w-full flex-col items-center justify-center px-4 py-8">
      <div className="flex w-full max-w-4xl flex-col gap-2">
        <PageBreadcrumbs
          title={video.title}
          className="px-4"
          onLevelUpClick={handleBack}
        />
        <VideoDetailsCard video={video} />
      </div>
    </div>
  );
}
