export function VideoCardSkeleton() {
  return (
    <div className="overflow-hidden">
      <div className="aspect-video w-full animate-pulse rounded-lg bg-gray-200" />

      <div className="p-4">
        <div className="mb-3 h-5 animate-pulse rounded bg-gray-200" />

        <div className="mb-2 h-4 w-1/3 animate-pulse rounded bg-gray-200" />

        <div className="flex items-center gap-3">
          <div className="h-4 w-16 animate-pulse rounded bg-gray-200" />
          <div className="h-4 w-24 animate-pulse rounded bg-gray-200" />
        </div>
      </div>
    </div>
  );
}
