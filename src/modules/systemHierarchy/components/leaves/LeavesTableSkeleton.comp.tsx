import type { FC } from 'react'

import { Skeleton } from '@/components/ui/skeleton'

export const LeavesTableSkeleton: FC = () => {
    return (
        <div className="space-y-2 p-4">
            <Skeleton className="h-8 w-full" />
            {Array.from({ length: 10 }).map((_, i) => (
                <Skeleton key={i} className="h-10 w-full" />
            ))}
        </div>
    )
}
