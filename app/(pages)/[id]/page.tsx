import { notFound } from 'next/navigation';

import { VideoDetails } from '@/src/features/video-catalog';
import { getVideoById } from '@/src/lib/api-client';

interface VideoDetailsPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function VideoDetailsPage({ params }: VideoDetailsPageProps) {
  try {
    const { id } = await params;
    const video = await getVideoById(id);

    return <VideoDetails video={video} />;
  } catch (error) {
    console.error('Error loading video:', error);
    notFound();
  }
}
