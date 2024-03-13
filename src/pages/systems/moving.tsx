import type { NextPage } from 'next'
import Head from 'next/head'
import { Fragment } from 'react'

import { SystemsMovingContainer } from '@/modules/systemsMoving/SystemsMoving.cont'

const SystemsMovingPage: NextPage = () => {
  return (
    <Fragment>
      <Head>
        <title>Systems Overview</title>
      </Head>
      <SystemsMovingContainer />
    </Fragment>
  )
}

export default SystemsMovingPage
