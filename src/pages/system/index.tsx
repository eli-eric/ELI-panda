import type { NextPage } from 'next'
import Head from 'next/head'
import { useIntl } from 'react-intl'
import { message } from 'src/i18n/src/messages'

import { SystemItemContainer } from '@/modules/systemItem/SystemItem.cont'

const messages = message.systemItem

const SystemItemPage: NextPage = (): React.ReactElement => {
  const intl = useIntl()

  return (
    <>
      <Head>
        <title>{intl.formatMessage({ id: messages.head })}</title>
        <meta name="description" content="...." />
      </Head>
      <SystemItemContainer />
    </>
  )
}

export default SystemItemPage
