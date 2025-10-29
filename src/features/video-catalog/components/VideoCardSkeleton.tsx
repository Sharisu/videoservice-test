export function VideoCardSkeleton() {
  return (
    <div className="overflow-hidden">
      <div className="bg-muted aspect-video w-full animate-pulse rounded-lg" />

      <div className="p-4">
        <div className="bg-muted mb-3 h-5 animate-pulse rounded" />

        <div className="bg-muted mb-2 h-4 w-1/3 animate-pulse rounded" />

        <div className="flex items-center gap-3">
          <div className="bg-muted h-4 w-16 animate-pulse rounded" />
          <div className="bg-muted h-4 w-24 animate-pulse rounded" />
        </div>
      </div>
    </div>
  );
}
