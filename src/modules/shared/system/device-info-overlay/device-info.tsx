import { Suspense } from 'react'

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle
} from '@/components/ui/sheet'
import { Skeleton } from '@/components/ui/skeleton'

import LayoutDetailInfoContainer from './components/layout-detail-info.cont'
import { useShowDeviceStore } from './store/useShowDeviceStore'

const DeviceInfoSkeleton = () => (
  <div className="space-y-4">
    <div className="space-y-2">
      <Skeleton className="h-4 w-[250px]" />
      <Skeleton className="h-4 w-[200px]" />
    </div>
    <div className="space-y-2">
      <Skeleton className="h-4 w-[250px]" />
      <Skeleton className="h-4 w-[200px]" />
    </div>
    <div className="space-y-2">
      <Skeleton className="h-4 w-[250px]" />
      <Skeleton className="h-4 w-[200px]" />
    </div>
  </div>
)

export const DeviceInfoOverlay = () => {
  const { uid, setOpenDeviceInfo, openDeviceInfo, locationCode, code } =
    useShowDeviceStore()

  const getTitle = () => {
    if (code || uid) return 'Device Info'
    if (locationCode) return `Employees at location: ${locationCode}`
    return 'Device Information'
  }

  return (
    <Sheet open={openDeviceInfo} onOpenChange={setOpenDeviceInfo}>
      <SheetContent
        className="w-full sm:w-[600px] lg:w-[800px] xl:w-[900px] !max-w-none overflow-y-auto px-2 sm:px-4 lg:px-6"
        style={{ maxWidth: 'none' }}
      >
        <SheetHeader>
          <SheetTitle>{getTitle()}</SheetTitle>
        </SheetHeader>
        <div className="mt-6">
          <Suspense fallback={<DeviceInfoSkeleton />}>
            <LayoutDetailInfoContainer
              uid={uid}
              locationCode={locationCode}
              systemCode={code}
            />
          </Suspense>
        </div>
      </SheetContent>
    </Sheet>
  )
}
