import { Skeleton } from '@/components/ui/skeleton'

export const SystemEditSkeleton = () => (
    <div className="space-y-4">
        <div className="space-y-2">
            <Skeleton className="h-30 w-full" />
        </div>
        <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
        </div>
        <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
        </div>
        <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
        </div>
    </div>
)
