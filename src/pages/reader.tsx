import type { NextPage } from 'next'
import Head from 'next/head'
import { Fragment, useState } from 'react'
import { useIntl } from 'react-intl'
import { QrReader } from 'react-qr-reader'
import { message } from 'src/i18n/src/messages'

const messages = message.roomCardsPage

const QReader: NextPage = (): JSX.Element => {
  const intl = useIntl()
  const [data, setData] = useState('No result')

  return (
    <Fragment>
      <Head>
        <title>{intl.formatMessage({ id: messages.head })}</title>
        <meta name="description" content="...." />
      </Head>

      <div className="container m-auto flex-col items-center justify-center">
        <h1 className="text-xl font-mono text-center mt-2">PANDA QReader</h1>

        <QrReader
          className="max-w-2xl m-auto p-2 "
          onResult={result => {
            if (result) {
              let text = result?.getText()
              //try to get second line of the text , it separated by \r\n
              if (text?.includes('\r\n')) {
                text = text?.split('\r\n')[1]
              }
              setData(text)
            }
          }}
          constraints={{ facingMode: 'environment' }}
        />
        <div className="text-sm p-3 container text-center">{data}</div>
      </div>
    </Fragment>
  )
}

export default QReader
