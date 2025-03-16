import { Skeleton } from "@/components/ui/skeleton"

export function DashboardSkeleton() {
    return (
        <div className="grid gap-4">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {Array(4)
                    .fill(null)
                    .map((_, i) => (
                        <Skeleton key={i} className="h-32 w-full" />
                    ))}
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Skeleton className="h-[400px] md:col-span-1 lg:col-span-4" />
                <Skeleton className="h-[400px] md:col-span-1 lg:col-span-3" />
            </div>
        </div>
    )
}

