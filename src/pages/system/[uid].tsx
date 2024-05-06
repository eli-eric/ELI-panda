import type { NextPage } from 'next'
import Head from 'next/head'
import { Fragment } from 'react'
import { useIntl } from 'react-intl'
import { message } from 'src/i18n/src/messages'

import { SystemItemContainer } from '@/modules/systemItem/SystemItem.cont'

const messages = message.systemItem

interface Props {
  key?: string
  uid?: string
}

const SystemDetailPage: NextPage = ({ uid }: Props) => {
  const intl = useIntl()

  return (
    <Fragment>
      <Head>
        <title>{intl.formatMessage({ id: messages.head })}</title>
        <meta name="description" content="...." />
      </Head>

      <SystemItemContainer uid={uid} />
    </Fragment>
  )
}

SystemDetailPage.getInitialProps = ({ query }) => ({
  key: query.uid,
  uid: query.uid
})

export default SystemDetailPage
