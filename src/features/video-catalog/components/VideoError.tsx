import { CatIcon, RefreshCwIcon } from 'lucide-react';

interface Props {
  error: Error;
  onRefresh: () => void;
}

export function VideoError({ error, onRefresh }: Props) {
  return (
    <div className="flex flex-col items-center gap-8">
      <div className="flex flex-col items-center">
        <div className="flex flex-row items-center gap-2">
          <p className="text-secondary-foreground text-md">Oops! Cannot load videos. Please try again</p>
          <CatIcon
            className="text-muted-foreground h-8 w-8"
            strokeWidth={1}
          />
        </div>
        {error.message && <p className="text-muted-foreground text-sm">{error.message}</p>}
      </div>
      <button
        className="group hover:text-accent bg-muted flex cursor-pointer flex-row items-center gap-2 rounded-md px-4 py-2 text-black"
        onClick={onRefresh}
      >
        <span className="group-hover:text-accent text-foreground">Refresh</span>
        <RefreshCwIcon className="text-foreground group-hover:text-accent h-4 w-4 transition-transform duration-300 group-hover:rotate-180" />
      </button>
    </div>
  );
}
