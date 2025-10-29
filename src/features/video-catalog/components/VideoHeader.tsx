'use client';

import { FilterSelect, ResetButton, SearchInput } from '@/src/components/ui';
import { useFilters } from '@/src/hooks/useFilters';
import { VideoDuration } from '@/src/types/video';

import { VIDEO_DURATION_OPTIONS } from './consts';

export function VideoHeader() {
  const { search, duration, onSearchChange, onDurationChange, onReset, hasActiveFilters } = useFilters();

  return (
    <div className="flex w-full items-center justify-center rounded-lg">
      <div className="flex w-full max-w-4xl flex-col gap-4 md:flex-row">
        <div className="flex-1">
          <SearchInput
            value={search}
            onChange={onSearchChange}
            placeholder="Search by title..."
          />
        </div>

        <div className="flex w-full items-center gap-4 md:w-52">
          <FilterSelect<VideoDuration>
            value={duration}
            onChange={onDurationChange}
            options={VIDEO_DURATION_OPTIONS}
          />
          <ResetButton
            onClick={onReset}
            disabled={!hasActiveFilters}
          />
        </div>
      </div>
    </div>
  );
}
