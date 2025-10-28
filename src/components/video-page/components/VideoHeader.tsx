'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';

import { FilterSelect, ResetButton, SearchInput } from '@/src/components/ui';
import { useDebounce } from '@/src/hooks/useDebounce';
import { VideoDuration } from '@/src/types/video';

import { VIDEO_DURATION_OPTIONS } from './consts';

export function VideoHeader() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isFirstRender = useRef(true);

  const [searchInput, setSearchInput] = useState(searchParams.get('search') || '');
  const [duration, setDuration] = useState<VideoDuration>((searchParams.get('duration') as VideoDuration) || 'all');
  const debouncedSearch = useDebounce(searchInput, 500);

  useEffect(() => {
    // Avoid double rendering on initial render
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    const params = new URLSearchParams();

    if (debouncedSearch) {
      params.set('search', debouncedSearch);
    }

    if (duration && duration !== 'all') {
      params.set('duration', duration);
    }

    const newUrl = params.toString() ? `?${params.toString()}` : '/';
    router.push(newUrl, { scroll: false });
  }, [debouncedSearch, duration, router]);

  const handleSearchChange = useCallback((searchText: string) => {
    setSearchInput(searchText);
  }, []);

  const handleDurationChange = useCallback((duration: VideoDuration) => {
    setDuration(duration);
  }, []);

  const handleReset = useCallback(() => {
    setSearchInput('');
    setDuration('all');
    router.push('/', { scroll: false });
  }, [router]);

  const hasActiveFilters = searchInput || duration !== 'all';

  return (
    <div className="mb-8 rounded-lg bg-white p-4">
      <div className="flex flex-col gap-4 md:flex-row md:items-end">
        <div className="flex-1">
          <SearchInput
            value={searchInput}
            onChange={handleSearchChange}
            placeholder="Search by title..."
          />
        </div>

        <div className="flex w-full items-center gap-2 md:w-48">
          <FilterSelect<VideoDuration>
            value={duration}
            onChange={handleDurationChange}
            options={VIDEO_DURATION_OPTIONS}
          />
          <ResetButton
            onClick={handleReset}
            disabled={!hasActiveFilters}
          />
        </div>
      </div>
    </div>
  );
}
