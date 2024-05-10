import type { NextPage } from 'next'
import Head from 'next/head'
import { useIntl } from 'react-intl'
import { message } from 'src/i18n/src/messages'

import Card from '@/components/layout/Card'
import dynamic from 'next/dynamic'

const messages = message.systemTypeEdit

const NoSSRSystemTypeEditCont = dynamic(
  () => import('@/modules/system-type-edit/SystemTypeEdit.cont'),
  {
    ssr: false
  }
)

const SystemTypeEdit: NextPage = (): React.ReactElement => {
  const intl = useIntl()

  return (
    <>
      <Head>
        <title>{intl.formatMessage({ id: messages.head })}</title>
        <meta name="description" content="...." />
      </Head>
      <Card>
        <NoSSRSystemTypeEditCont />
      </Card>
    </>
  )
}

export default SystemTypeEdit
