import { Skeleton } from "@/components/ui/skeleton";

export const MessagesSkeleton = () => {
  return (
    <main className="mx-auto flex h-[calc(100vh-80px)] w-full max-w-7xl overflow-hidden border">
      {/* Conversations sidebar */}
      <aside className="flex w-96 shrink-0 flex-col border-r bg-background">
        <div className="border-b px-5 py-4">
          <Skeleton className="h-6 w-28" />
          <Skeleton className="mt-2 h-4 w-36" />
        </div>

        <div className="space-y-1 p-2">
          {Array.from({ length: 7 }).map((_, index) => (
            <div
              key={index}
              className="flex items-center gap-3 rounded-lg p-3"
            >
              <Skeleton className="h-12 w-12 shrink-0 rounded-full" />

              <div className="flex-1 space-y-2">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-3 w-full" />
              </div>
            </div>
          ))}
        </div>
      </aside>

      {/* Chat */}
      <section className="flex min-w-0 flex-1 flex-col">
        {/* Chat header */}
        <div className="flex items-center gap-3 border-b p-4">
          <Skeleton className="h-10 w-10 rounded-full" />
          <Skeleton className="h-4 w-32" />
        </div>

        {/* Messages */}
        <div className="flex flex-1 flex-col justify-end gap-4 p-6">
          <Skeleton className="h-12 w-2/5 self-start rounded-2xl" />
          <Skeleton className="h-16 w-1/2 self-end rounded-2xl" />
          <Skeleton className="h-12 w-1/3 self-start rounded-2xl" />
          <Skeleton className="h-14 w-2/5 self-end rounded-2xl" />
        </div>

        {/* Input */}
        <div className="border-t p-4">
          <Skeleton className="h-11 w-full rounded-lg" />
        </div>
      </section>
    </main>
  );
};