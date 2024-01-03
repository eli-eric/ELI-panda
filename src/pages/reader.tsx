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

      <div>
        <h1>QReader</h1>

        <QrReader
          onResult={result => {
            if (result) {
              setData(result?.toString())
            }
          }}
          containerStyle={{ width: '30%' }}
          constraints={{ facingMode: 'environment' }}
        />
        <p className="text-3xl">{data}</p>
      </div>
    </Fragment>
  )
}

export default QReader
