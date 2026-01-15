import { Skeleton } from "@/components/ui/skeleton";

export default function MenuLoading() {
  return (
    <main className="min-h-screen mx-auto w-full max-w-md border-gray bg-background">
      <div className="mx-auto w-full max-w-3xl space-y-6">
        {/* Header */}
        <div className="space-y-2">
          <Skeleton className="h-7 w-48" />
          <Skeleton className="h-4 w-72" />
        </div>

        {/* Search */}
        <Skeleton className="h-10 w-full" />

        {/* Category chips */}
        <div className="flex flex-wrap gap-2">
          <Skeleton className="h-8 w-24 rounded-full" />
          <Skeleton className="h-8 w-20 rounded-full" />
          <Skeleton className="h-8 w-28 rounded-full" />
          <Skeleton className="h-8 w-24 rounded-full" />
        </div>

        {/* Items list */}
        <div className="space-y-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="flex gap-4">
              <div className="flex-1 space-y-2">
                <Skeleton className="h-4 w-40" />
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-4/5" />
              </div>
              <Skeleton className="h-[100px] w-[100px] rounded-lg" />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
