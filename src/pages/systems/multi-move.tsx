import type { NextPage } from 'next'
import dynamic from 'next/dynamic'
import Head from 'next/head'
import { Fragment } from 'react'
import { FormattedMessage } from 'react-intl'

import { messages } from '@/i18n/src/locale/en'

const SystemsMultiMove = dynamic(
  () =>
    import('@/modules/systems-multi-move/systems-multi-move.cont').then(
      mod => mod.SystemsMultiMoveContainer
    ),
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
      <SystemsMultiMove />
    </Fragment>
  )
}

export default SystemsMovingPage
