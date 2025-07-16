import { Suspense } from 'react'

import SlideOver from '@/components/overlays/slideover/SlideOver'
import LayoutDetailInfoContainer from '@/modules/shared/system/device-info-overlay/components/layout-detail-info.cont'

import { useShowDeviceStore } from './store/useShowDeviceStore'

export const DeviceInfoOverlay = () => {
  const { uid, setOpenDeviceInfo, openDeviceInfo, locationCode, code } =
    useShowDeviceStore()
  return (
    <SlideOver
      size="md"
      panelSlide="right"
      panelTitle={
        code || uid ? 'Device Info' : `Employees at location: ${locationCode}`
      }
      open={openDeviceInfo}
      setOpen={setOpenDeviceInfo}
    >
      <Suspense>
        <LayoutDetailInfoContainer
          uid={uid}
          locationCode={locationCode}
          systemCode={code}
        />
      </Suspense>
    </SlideOver>
  )
}
