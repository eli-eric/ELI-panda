import type { NextPage } from 'next'
import dynamic from 'next/dynamic'
import Head from 'next/head'
import { Fragment } from 'react'
import { useIntl } from 'react-intl'

import { message } from '@/i18n/src/messages'

const SystemCodesCreateContainer = dynamic(
  () => import('@/modules/control-systems/SystemCodesCreate.cont'),
  {
    ssr: false
  }
)

const SystemCodesCreatePage: NextPage = () => {
  const { formatMessage: fm } = useIntl()

  return (
    <Fragment>
      <Head>
        <title>{fm({ id: message.controlSystems.pages.create })}</title>
      </Head>
      <SystemCodesCreateContainer />
    </Fragment>
  )
}

export default SystemCodesCreatePage
