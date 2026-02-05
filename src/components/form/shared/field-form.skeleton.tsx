import type { FC } from 'react'

import { Skeleton } from '@/components/ui/skeleton'
import { cn } from '@/lib/utils'

interface Props {
    className?: string
}

export const FormFieldSkeleton: FC<Props> = ({ className }) => {
    return (
        <div className={cn('flex flex-col space-y-2 h-12', className)}>
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-full w-full" />
        </div>
    )
}
