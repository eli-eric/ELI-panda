import { Card, CardContent } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

export const RoomCardDetailSkeleton = () => (
    <>
        {/* Header skeleton */}
        <div className="flex items-center justify-between px-4 py-4 border-b">
            <Skeleton className="h-8 w-64" />
            <div className="flex gap-2">
                <Skeleton className="h-10 w-24" />
                <Skeleton className="h-10 w-32" />
            </div>
        </div>

        <div className="container mx-auto max-w-7xl px-4 space-y-6 py-6">
            {/* RoomCardInfoCard skeleton - 4 form fields */}
            <Card>
                <CardContent className="pt-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Name */}
                        <div className="space-y-2">
                            <Skeleton className="h-4 w-32" />
                            <Skeleton className="h-10 w-full" />
                        </div>
                        {/* Status */}
                        <div className="space-y-2">
                            <Skeleton className="h-4 w-24" />
                            <Skeleton className="h-10 w-full" />
                        </div>
                        {/* Operational State */}
                        <div className="space-y-2">
                            <Skeleton className="h-4 w-40" />
                            <Skeleton className="h-10 w-full" />
                        </div>
                        {/* Last Updated */}
                        <div className="space-y-2">
                            <Skeleton className="h-4 w-36" />
                            <Skeleton className="h-4 w-48" />
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* RoomCardCleanRoomsCard skeleton - table with form inputs */}
            <div>
                <Skeleton className="h-6 w-32 mb-2" />
                <div className="border rounded">
                    {[1, 2, 3, 4].map(i => (
                        <div key={i} className="flex border-b last:border-b-0 p-2">
                            <Skeleton className="h-8 w-1/3" />
                            <Skeleton className="h-8 w-2/3 ml-2" />
                        </div>
                    ))}
                </div>
            </div>

            {/* RoomCardBuildingMaintenanceCard skeleton - table with form inputs */}
            <div>
                <Skeleton className="h-6 w-48 mb-2" />
                <div className="border rounded">
                    {[1, 2, 3].map(i => (
                        <div key={i} className="flex border-b last:border-b-0 p-2">
                            <Skeleton className="h-8 w-1/4" />
                            <Skeleton className="h-8 w-1/3 ml-2" />
                            <Skeleton className="h-8 w-1/3 ml-2" />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </>
)
