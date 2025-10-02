import type { NextPage } from 'next'
import dynamic from 'next/dynamic'
import Head from 'next/head'
import { Fragment } from 'react'
import { FormattedMessage } from 'react-intl'

import { messages } from '@/i18n/src/locale/en'

const SystemsContainer = dynamic(
  () => import('@/modules/systems/Systems.cont'),
  {
    ssr: false
  }
)

const SystemsPage: NextPage = () => {
  return (
    <Fragment>
      <Head>
        <title>
          <FormattedMessage id={messages.common.pages.systemsOverview} />
        </title>
      </Head>
      <SystemsContainer />
    </Fragment>
  )
}

export default SystemsPage
