import { PlayCircleIcon } from 'lucide-react';
import Link from 'next/link';

import { ApiErrorToggle, ThemeToggle } from '@/src/components/ui';

export function Header() {
  return (
    <header className="bg-background border-border z-10 flex h-[64px] w-full shrink-0 items-center justify-center border-b px-4 shadow-md">
      <div className="flex w-full max-w-4xl items-center justify-between gap-10">
        <Link
          href="/"
          className="flex cursor-pointer flex-row items-center gap-2"
        >
          <PlayCircleIcon className="text-accent h-6 w-6" />
          <h1 className="text-foreground text-xl font-bold">Video catalog</h1>
        </Link>
        <div className="flex items-center justify-center gap-2">
          <ApiErrorToggle />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
