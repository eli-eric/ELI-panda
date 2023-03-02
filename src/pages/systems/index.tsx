import { NextPage } from 'next'
import Head from 'next/head'
import { Fragment } from 'react'

import SystemOverviewContainer from '@/modules/systems/SystemOverview.cont'

const RootSystemPage: NextPage = () => (
  <Fragment>
    <Head>
      <title>Systems Overview</title>
    </Head>
    <SystemOverviewContainer />
  </Fragment>
)

export default RootSystemPage
