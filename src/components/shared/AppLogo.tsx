'use client';

import { PlayCircleIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { useFilters } from '@/src/hooks/useFilters';

export function AppLogo() {
  const { onReset } = useFilters();
  const router = useRouter();

  const handleClick = () => {
    onReset();
    router.replace('/');
  };

  return (
    <button
      onClick={handleClick}
      className="flex cursor-pointer flex-row items-center gap-2"
    >
      <PlayCircleIcon className="text-accent h-6 w-6" />
      <h1 className="text-foreground text-xl font-bold">Video catalog</h1>
    </button>
  );
}
