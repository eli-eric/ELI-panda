import type { NextPage } from 'next'
import Head from 'next/head'
import { Fragment } from 'react'

import { SystemsContainer } from '@/modules/systems/Systems.cont'

const SystemsPage: NextPage = () => {
  return (
    <Fragment>
      <Head>
        <title>Systems Overview</title>
      </Head>
      <SystemsContainer />
    </Fragment>
  )
}

export default SystemsPage
