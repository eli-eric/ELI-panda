import type { NextPage } from 'next'
import dynamic from 'next/dynamic'
import Head from 'next/head'
import { Fragment } from 'react'
import { FormattedMessage } from 'react-intl'

import { messages } from '@/i18n/src/locale/en'

const SystemsMovingContainer = dynamic(
  () => import('@/modules/systemsMoving/SystemsMoving.cont'),
  {
    ssr: false
  }
)

const SystemsMovingPage: NextPage = () => {
  return (
    <Fragment>
      <Head>
        <title>
          <FormattedMessage id={messages.common.pages.systemsMoving} />
        </title>
      </Head>
      <SystemsMovingContainer />
    </Fragment>
  )
}

export default SystemsMovingPage
