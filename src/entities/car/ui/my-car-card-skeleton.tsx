export const MyCarCardSkeleton = () => {
  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-card">
      <div className="h-56 animate-pulse bg-muted" />

      <div className="space-y-5 p-5">
        <div className="space-y-2">
          <div className="h-8 w-28 animate-pulse rounded-md bg-muted" />
          <div className="h-6 w-48 animate-pulse rounded-md bg-muted" />
        </div>

        <div className="grid grid-cols-3 gap-3 border-y border-border py-4">
          <div className="flex flex-col items-center gap-2">
            <div className="h-5 w-5 animate-pulse rounded bg-muted" />
            <div className="h-4 w-12 animate-pulse rounded bg-muted" />
          </div>

          <div className="flex flex-col items-center gap-2">
            <div className="h-5 w-5 animate-pulse rounded bg-muted" />
            <div className="h-4 w-16 animate-pulse rounded bg-muted" />
          </div>

          <div className="flex flex-col items-center gap-2">
            <div className="h-5 w-5 animate-pulse rounded bg-muted" />
            <div className="h-4 w-20 animate-pulse rounded bg-muted" />
          </div>
        </div>
      </div>

      <div className="flex justify-center gap-2 py-6">
        <div className="h-10 w-20 animate-pulse rounded-lg bg-muted" />
        <div className="h-10 w-24 animate-pulse rounded-lg bg-muted" />
      </div>
    </div>
  );
};