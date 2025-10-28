'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';

import { VideoDuration } from '@/src/types/video';

import { useDebounce } from './useDebounce';

export function useFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [duration, setDuration] = useState<VideoDuration>((searchParams.get('duration') as VideoDuration) || 'all');

  const debouncedSearch = useDebounce(search, 500);

  useEffect(() => {
    const currentSearch = searchParams.get('search') || '';
    const currentDuration = (searchParams.get('duration') as VideoDuration) || 'all';

    setSearch(currentSearch);
    setDuration(currentDuration);
  }, [searchParams]);

  useEffect(() => {
    const params = new URLSearchParams();
    if (debouncedSearch) params.set('search', debouncedSearch);
    if (duration !== 'all') params.set('duration', duration);

    const newUrl = params.toString() ? `?${params.toString()}` : '/';

    const currentUrl = searchParams.toString() ? `?${searchParams.toString()}` : '/';
    if (newUrl !== currentUrl) {
      router.push(newUrl, { scroll: false });
    }
  }, [debouncedSearch, duration, router, searchParams]);

  const handleReset = useCallback(() => {
    setSearch('');
    setDuration('all');
    router.push('/', { scroll: false });
  }, [router]);

  const hasActiveFilters = Boolean(search) || duration !== 'all';

  return {
    search,
    duration,
    onSearchChange: setSearch,
    onDurationChange: setDuration,
    onReset: handleReset,
    hasActiveFilters,
  };
}
