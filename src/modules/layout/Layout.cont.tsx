import { Fragment, lazy, Suspense, useEffect, useState } from 'react'

import { SlideOver } from '@/components/overlays/slideover/SlideOver'

const LayoutDetailInfoContainer = lazy(
  () => import('./components/layout-detail-info.cont')
)

const LayoutContainer = () => {
  const [alias, setAlias] = useState<string | undefined>(undefined)
  const [openDetailInfo, setOpenDetailInfo] = useState(false)

  const [locationCode, setLocationCode] = useState<string | undefined>(
    undefined
  )

  useEffect(() => {
    function handleMessage(
      event: MessageEvent<{
        type: string
        href?: string
      }>
    ) {
      const allowedIframeOrigins = [
        'https://layout.eli-beams.eu',
        'https://panda.eli-laser.eu',
        'https://dev.panda.eli-beams.eu',
        'https://test.panda.eli-beams.eu'
      ]
      if (!allowedIframeOrigins.includes(event.origin)) {
        console.warn('Message from unauthorized origin:', event.origin)
        return
      }

      const { href } = event.data
      if (href) {
        const query = new URLSearchParams(href.split('?')[1])
        const systemCode = query.get('getDeviceInfo')
        const locationCode = query.get('getOfficeInfo')
        if (systemCode) {
          event.preventDefault()
          setAlias(systemCode)
          setLocationCode(undefined)
          setOpenDetailInfo(true)
        }

        if (locationCode) {
          event.preventDefault()
          setLocationCode(locationCode)
          setAlias(undefined)
          setOpenDetailInfo(true)
        }
      }
    }
    window.addEventListener('message', handleMessage)
    return () => {
      window.removeEventListener('message', handleMessage)
      setAlias(undefined)
    }
  }, [])

  return (
    <Fragment>
      <iframe
        src="https://layout.eli-beams.eu/index.html"
        className="h-full w-full"
        sandbox="allow-scripts allow-same-origin allow-popups allow-forms allow-top-navigation allow-top-navigation-by-user-activation"
      ></iframe>
      <SlideOver
        panelSlide="right"
        panelTitle={
          alias ? 'Device Info' : `Employees at location: ${locationCode}`
        }
        open={openDetailInfo}
        setOpen={setOpenDetailInfo}
      >
        <Suspense>
          <LayoutDetailInfoContainer
            systemCode={alias}
            locationCode={locationCode}
          />
        </Suspense>
      </SlideOver>
    </Fragment>
  )
}

export default LayoutContainer
