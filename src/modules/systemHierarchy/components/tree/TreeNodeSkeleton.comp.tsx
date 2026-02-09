import type { FC } from 'react'

import { Skeleton } from '@/components/ui/skeleton'

interface TreeNodeSkeletonProps {
    count?: number
}

export const TreeNodeSkeleton: FC<TreeNodeSkeletonProps> = ({ count = 8 }) => {
    return (
        <div className="space-y-1 p-2">
            {Array.from({ length: count }).map((_, i) => (
                <div
                    key={i}
                    className="flex items-center gap-2 py-1"
                    style={{ paddingLeft: `${(i % 3) * 16}px` }}
                >
                    <Skeleton className="h-4 w-4 shrink-0" />
                    <Skeleton className="h-4 flex-1" />
                </div>
            ))}
        </div>
    )
}
