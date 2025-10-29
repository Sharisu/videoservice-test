import { VideoDuration } from '@/src/types/video';

export interface VideoDurationOption {
  value: VideoDuration;
  label: string;
}

export const VIDEO_DURATION_OPTIONS: Array<VideoDurationOption> = [
  { value: 'all', label: 'All durations' },
  { value: 'short', label: '< 5 min' },
  { value: 'medium', label: '5-20 min' },
  { value: 'long', label: '> 20 min' },
];
