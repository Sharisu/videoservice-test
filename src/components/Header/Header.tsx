import { PlayCircleIcon } from 'lucide-react';

export function Header() {
  return (
    <header className="z-10 flex h-[64px] w-full shrink-0 items-center justify-center bg-white px-4 shadow-md">
      <div className="w-full max-w-4xl items-center gap-10">
        <div className="flex flex-row items-center gap-2">
          <PlayCircleIcon className="h-6 w-6" />
          <h1 className="text-xl font-bold text-gray-900">Video catalog</h1>
        </div>
      </div>
    </header>
  );
}
