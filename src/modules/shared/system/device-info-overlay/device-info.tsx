import { Suspense } from 'react'

import SlideOver from '@/components/overlays/slideover/SlideOver'
import LayoutDetailInfoContainer from '@/modules/layout/components/layout-detail-info.cont'

import { useShowDeviceStore } from './store/useShowDeviceStore'

export const DeviceInfoOverlay = () => {
  const { uid, setOpenDeviceInfo, openDeviceInfo } = useShowDeviceStore()
  return (
    <SlideOver
      size="md"
      panelSlide="right"
      panelTitle={'Device Info'}
      open={openDeviceInfo}
      setOpen={setOpenDeviceInfo}
    >
      <Suspense>
        <LayoutDetailInfoContainer uid={uid} />
      </Suspense>
    </SlideOver>
  )
}
