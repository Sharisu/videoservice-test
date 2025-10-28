import { VideoHeader, VideoList } from './components';

export function VideoPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <VideoHeader />
      <VideoList />
    </div>
  );
}
