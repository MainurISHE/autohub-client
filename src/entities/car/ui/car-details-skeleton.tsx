export const CarDetailsSkeleton = () => {
  return (
    <div className="grid gap-8 lg:grid-cols-2">
      {/* Gallery */}
      <div className="overflow-hidden rounded-2xl">
        <div className="h-[500px] animate-pulse rounded-2xl bg-muted" />
      </div>

      {/* Details */}
      <div className="space-y-8">
        {/* Header */}
        <div>
          <div className="h-10 w-3/4 animate-pulse rounded-lg bg-muted" />

          <div className="mt-3 h-5 w-1/2 animate-pulse rounded-md bg-muted" />

          <div className="mt-6 h-12 w-40 animate-pulse rounded-lg bg-muted" />
        </div>

        {/* Specs */}
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {Array.from({ length: 8 }).map((_, index) => (
            <div
              key={index}
              className="rounded-xl border p-4"
            >
              <div className="h-5 w-5 animate-pulse rounded bg-muted" />

              <div className="mt-4 h-3 w-16 animate-pulse rounded bg-muted" />

              <div className="mt-2 h-5 w-20 animate-pulse rounded bg-muted" />
            </div>
          ))}
        </div>

        {/* Description */}
        <div>
          <div className="h-7 w-32 animate-pulse rounded-md bg-muted" />

          <div className="mt-4 space-y-2">
            <div className="h-4 w-full animate-pulse rounded bg-muted" />
            <div className="h-4 w-full animate-pulse rounded bg-muted" />
            <div className="h-4 w-4/5 animate-pulse rounded bg-muted" />
          </div>
        </div>
      </div>
    </div>
  );
};