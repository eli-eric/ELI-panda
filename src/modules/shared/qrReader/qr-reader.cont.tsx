import { ChevronRightIcon } from '@heroicons/react/20/solid'
import jsQR from 'jsqr'
import Link from 'next/link'
import { Fragment, useEffect, useRef, useState } from 'react'

import { Heading } from '@/components/layout/Heading'
import ProgressBarComponent from '@/components/progress-bar.comp'
import { classNames } from '@/utils'

import { useFindOrder, useFindSystem } from './hooks/useFindSystem'

type DataType = { type: string; name: string; href: string }

export const QrReaderContainer = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const [isVideoShown, setIsVideoShown] = useState(true)
  const [eun, setEun] = useState<string | undefined>()
  const [results, setResults] = useState<string | undefined>()
  const [data, setData] = useState<DataType[]>([])

  const { systemDetail, loading } = useFindSystem(eun)
  const { order, loading: loadingOrder } = useFindOrder(eun)

  useEffect(() => {
    if (systemDetail) {
      setData(data => [
        ...data,
        {
          type: 'System',
          name: systemDetail?.name,
          href: `/system/${systemDetail?.uid}`
        }
      ])
    }
  }, [systemDetail])

  useEffect(() => {
    if (order) {
      setData(data => [
        ...data,
        {
          type: 'Order',
          name: order?.name,
          href: `/order/${order?.uid}`
        }
      ])
    }
  }, [order])

  useEffect(() => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia({
          video: { facingMode: 'environment', width: { ideal: 640 }, height: { ideal: 480 } }
        })
        .then(stream => {
          if (videoRef.current) {
            videoRef.current.srcObject = stream
            videoRef.current.play()
          }
        })
        .catch(() => {
          // Fall back to any available camera
          navigator.mediaDevices
            .getUserMedia({
              video: true
            })
            .then(stream => {
              if (videoRef.current) {
                videoRef.current.srcObject = stream
                videoRef.current.play()
              }
            })
        })
    }

    const interval = setInterval(() => {
      if (videoRef.current && canvasRef.current) {
        const context = canvasRef.current.getContext('2d')
        if (context) {
          context.drawImage(videoRef.current, 0, 0, 640, 480)
          const imageData = context.getImageData(0, 0, 640, 480)
          const qrCode = jsQR(imageData.data, imageData.width, imageData.height)
          if (qrCode) {
            console.log(`QR Code detected: ${qrCode.data}`)

            if (qrCode.data) {
              // ... other code ...
              let text = qrCode.data
              if (text?.includes('\r\n')) {
                text = text?.split('\r\n')[1]
              }
              setEun(text)
              setResults(qrCode.data)
              if (videoRef.current && videoRef.current.srcObject) {
                const stream = videoRef.current.srcObject as MediaStream
                const tracks = stream.getTracks()

                tracks.forEach(track => {
                  track.stop()
                })

                setIsVideoShown(false)
              }
            }
          }
        }
      }
    }, 300)

    return () => clearInterval(interval)
  }, [])

  return (
    <Fragment>
      <Heading customText="Scan QR code" />
      {isVideoShown && <video ref={videoRef} width="640" height="480" />}
      <canvas ref={canvasRef} width="640" height="480" className="hidden" />
      <div className={classNames('text-sm p-3 container text-center', systemDetail || order ? 'hidden' : 'block')}>
        {results && <p className="text-gray-600 dark:text-gray-200">{results}</p>}
      </div>
      {loading || (loadingOrder && <ProgressBarComponent />)}
      <div className={classNames(systemDetail || order ? 'block' : 'hidden')}>
        <Results data={data} />
      </div>
    </Fragment>
  )
}

interface Props {
  data: Array<{ type: string; name: string; href: string }>
}

export const Results = ({ data }: Props) => (
  <ul
    role="list"
    className="divide-y divide-gray-100 overflow-hidden bg-white dark:bg-gray-900 shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl"
  >
    {data.map(item => (
      <Link key={item.type} target="_blank" href={item.href}>
        <li className="relative flex justify-between gap-x-6 px-4 py-5 hover:bg-gray-50 sm:px-6">
          <div className="flex min-w-0 gap-x-4">
            <div className="min-w-0 flex-auto">
              <p className="text-sm font-semibold leading-6 text-gray-900 dark:text-gray-200">
                <span className="absolute inset-x-0 -top-px bottom-0" />
                {item.type}
              </p>
              <p className="mt-1 flex text-xs leading-5 text-gray-500">
                <span className="relative truncate hover:underline">{item.name}</span>
              </p>
            </div>
          </div>
          <div className="flex shrink-0 items-center gap-x-4">
            <div className="hidden sm:flex sm:flex-col sm:items-end"></div>
            <ChevronRightIcon className="h-5 w-5 flex-none text-gray-400" aria-hidden="true" />
          </div>
        </li>
      </Link>
    ))}
  </ul>
)
