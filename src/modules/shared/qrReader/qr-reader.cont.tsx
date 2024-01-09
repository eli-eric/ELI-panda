import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { QrReader } from 'react-qr-reader'

import { Heading } from '@/components/layout/Heading'
import ProgressBarComponent from '@/components/progress-bar.comp'

import { useFindSystem } from './hooks/useFindSystem'

export const QrReaderContainer = () => {
  const [eun, setEun] = useState<string | undefined>()
  const [result, setResult] = useState<string | undefined>()
  const router = useRouter()

  const { systemDetail, loading } = useFindSystem(eun)

  useEffect(() => {
    if (systemDetail) {
      window.open(`/system/${systemDetail.uid}`, '_blank')
    }
  }, [systemDetail, router])

  return (
    <div>
      <Heading customText="Scan QR code" />
      <div className="h-full max-w-xl m-auto">
        <QrReader
          onResult={result => {
            if (result) {
              let text = result?.getText()
              //try to get second line of the text , it separated by \r\n
              if (text?.includes('\r\n')) {
                text = text?.split('\r\n')[1]
              }
              setEun(text)
              setResult(result?.getText())
            }
          }}
          constraints={{ facingMode: 'environment' }}
        />
        <div className="text-sm p-3 container text-center">{result}</div>
        {loading && <ProgressBarComponent />}
      </div>
    </div>
  )
}
