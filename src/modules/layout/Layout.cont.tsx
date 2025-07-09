import { Fragment, lazy, useEffect } from 'react'

import { DeviceInfoOverlay } from '../shared/system/device-info-overlay/device-info'
import { useShowDeviceStore } from '../shared/system/device-info-overlay/store/useShowDeviceStore'

const LayoutDetailInfoContainer = lazy(
  () => import('./components/layout-detail-info.cont')
)

const LayoutContainer = () => {
  const { setCode, setOpenDeviceInfo, setUID, setLocationCode } =
    useShowDeviceStore()

  useEffect(() => {
    function handleMessage(
      event: MessageEvent<{
        type: string
        href?: string
      }>
    ) {
      const { href } = event.data
      if (href) {
        const query = new URLSearchParams(href.split('?')[1])
        const systemCode = query.get('getDeviceInfo')
        const locationCode = query.get('getOfficeInfo')
        if (systemCode) {
          event.preventDefault()
          setCode(systemCode)
          setOpenDeviceInfo(true)
        }

        if (locationCode) {
          event.preventDefault()
          setLocationCode(locationCode)
          setOpenDeviceInfo(true)
        }
      }
    }
    window.addEventListener('message', handleMessage)
    return () => {
      window.removeEventListener('message', handleMessage)
      setCode(undefined)
      setLocationCode(undefined)
      setUID(undefined)
      setOpenDeviceInfo(false)
    }
  }, [])

  return (
    <Fragment>
      <iframe
        src="https://layout.eli-beams.eu/index.html"
        className="h-full w-full"
        sandbox="allow-scripts allow-same-origin allow-popups allow-forms allow-top-navigation allow-top-navigation-by-user-activation"
      ></iframe>
      <DeviceInfoOverlay />
    </Fragment>
  )
}

export default LayoutContainer
