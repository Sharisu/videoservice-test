'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { createContext, ReactNode, useCallback, useContext, useEffect, useMemo, useState, useTransition } from 'react';

import { VideoDuration } from '@/src/types/video';

import { useDebounce } from './useDebounce';

interface FiltersContextType {
  search: string;
  duration: VideoDuration;
  onSearchChange: (value: string) => void;
  onDurationChange: (value: VideoDuration) => void;
  onReset: () => void;
  hasActiveFilters: boolean;
}

const FiltersContext = createContext<FiltersContextType | undefined>(undefined);

interface Props {
  children: ReactNode;
}

export function FiltersProvider({ children }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [, startTransition] = useTransition();

  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [duration, setDuration] = useState<VideoDuration>((searchParams.get('duration') as VideoDuration) || 'all');

  const debouncedSearch = useDebounce(search, 500);

  useEffect(() => {
    const params = new URLSearchParams();
    if (debouncedSearch) params.set('search', debouncedSearch);
    if (duration !== 'all') params.set('duration', duration);

    const newQuery = params.toString();
    const currentQuery = searchParams.toString();

    if (newQuery !== currentQuery) {
      startTransition(() => {
        router.replace(newQuery ? `${pathname}?${newQuery}` : pathname, { scroll: false });
      });
    }
  }, [debouncedSearch, duration, pathname, router, search, searchParams]);

  const onReset = useCallback(() => {
    setSearch('');
    setDuration('all');
    startTransition(() => router.replace(pathname, { scroll: false }));
  }, [pathname, router]);

  const value = useMemo(
    () => ({
      search,
      duration,
      onSearchChange: setSearch,
      onDurationChange: setDuration,
      onReset,
      hasActiveFilters: search !== '' || duration !== 'all',
    }),
    [search, duration, onReset],
  );

  return <FiltersContext.Provider value={value}>{children}</FiltersContext.Provider>;
}

export function useFilters() {
  const context = useContext(FiltersContext);
  if (context === undefined) {
    throw new Error('useFilters must be used within a FiltersProvider');
  }
  return context;
}
