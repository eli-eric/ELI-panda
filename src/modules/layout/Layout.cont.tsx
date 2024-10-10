import { Fragment, lazy, Suspense, useEffect, useState } from 'react'

const SystemDetailInfo = lazy(
  () => import('@/modules/layout/components/system-detail-info.comp')
)

const SlideOver = lazy(
  () => import('@/components/overlays/slideover/SlideOver')
)

const LayoutContainer = () => {
  const [alias, setAlias] = useState<string | undefined>(undefined)
  const [openDetailInfo, setOpenDetailInfo] = useState(false)

  useEffect(() => {
    function handleMessage(
      event: MessageEvent<{
        type: string
        href?: string
      }>
    ) {
      const allowedIframeOrigins = [
        'https://layout.eli-beams.eu'
        // Add other allowed origins if necessary
      ]

      if (!allowedIframeOrigins.includes(event.origin)) {
        // eslint-disable-next-line no-console
        console.warn('Message from unauthorized origin:', event.origin)
        return
      }

      const { href } = event.data
      if (href) {
        const query = new URLSearchParams(href.split('?')[1])
        const systemCode = query.get('getDeviceInfo')
        if (systemCode) {
          setAlias(systemCode)
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
      <Suspense>
        <SlideOver
          panelSlide="right"
          panelTitle="System Detail Info"
          open={openDetailInfo}
          setOpen={setOpenDetailInfo}
        >
          <Suspense>
            <SystemDetailInfo alias={alias} />
          </Suspense>
        </SlideOver>
      </Suspense>
    </Fragment>
  )
}

export default LayoutContainer
