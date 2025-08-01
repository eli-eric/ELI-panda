import { Skeleton } from '@/components/ui/skeleton'
import { cn } from '@/lib/utils'

interface ImagePlaceHolderProps {
  className?: string
}

export const ImagePlaceHolder = ({ className }: ImagePlaceHolderProps) => (
  <div className={cn('w-full max-w-full border rounded-md overflow-hidden', className)}>
    {/* Action buttons skeleton */}
    <div className="flex items-center justify-between px-2 py-1 bg-background/95 border-b">
      <div className="flex items-center gap-1">
        <Skeleton className="h-6 w-12" />
        <Skeleton className="h-6 w-10" />
      </div>
      <Skeleton className="h-4 w-8" />
    </div>
    
    {/* Main image skeleton */}
    <div className="px-6">
      <Skeleton className="aspect-[3/2] w-full rounded-sm" />
    </div>
    
    {/* Thumbnails skeleton */}
    <div className="flex items-center justify-center gap-1 px-2 py-1 border-t bg-muted/30">
      <Skeleton className="size-6 rounded-sm" />
      <Skeleton className="size-6 rounded-sm" />
      <Skeleton className="size-6 rounded-sm" />
    </div>
  </div>
)
