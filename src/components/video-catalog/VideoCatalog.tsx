import { VideoHeader, VideoList } from './components';

export function VideoCatalog() {
  return (
    <div className="container mx-auto flex flex-col gap-8 px-4 py-8">
      <VideoHeader />
      <VideoList />
    </div>
  );
}
