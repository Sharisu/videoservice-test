import { PlayCircleIcon } from 'lucide-react';
import Link from 'next/link';

export function Header() {
  return (
    <header className="z-10 flex h-[64px] w-full shrink-0 items-center justify-center bg-white px-4 shadow-md">
      <div className="w-full max-w-4xl items-center gap-10">
        <Link
          href="/"
          className="flex cursor-pointer flex-row items-center gap-2"
        >
          <PlayCircleIcon className="text-accent h-6 w-6" />
          <h1 className="text-xl font-bold text-gray-900">Video catalog</h1>
        </Link>
      </div>
    </header>
  );
}
