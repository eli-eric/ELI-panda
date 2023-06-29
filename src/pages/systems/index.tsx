import type { NextPage } from 'next'
import Head from 'next/head'
import { Fragment } from 'react'

import { SystemsContainer } from '@/modules/systems/Systems.cont'

const RootSystemPage: NextPage = () => (
  <Fragment>
    <Head>
      <title>Systems Overview</title>
    </Head>
    <SystemsContainer />
  </Fragment>
)

export default RootSystemPage
