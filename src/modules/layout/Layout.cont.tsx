import { Fragment, useEffect, useState } from 'react'

import { SlideOver } from '@/components/overlays/slideover/SlideOver'

import { SystemDetailInfo } from './components/system-detail-info.comp'

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
      const { href } = event.data
      if (href) {
        const query = new URLSearchParams(href.split('?')[1])
        const systemCode = query.get('getDeviceInfo')
        systemCode && setAlias(systemCode)
        setOpenDetailInfo(true)
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
        sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
      ></iframe>
      <SlideOver
        panelSlide="right"
        panelTitle="System Detail Info"
        open={openDetailInfo}
        setOpen={setOpenDetailInfo}
      >
        <SystemDetailInfo alias={alias} />
      </SlideOver>
    </Fragment>
  )
}

export default LayoutContainer
