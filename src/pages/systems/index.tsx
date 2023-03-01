import { NextPage } from 'next'
import Head from 'next/head'
import { Fragment } from 'react'

import useParam from '@/hooks/useParam'
import SystemOverviewContainer from '@/modules/systems/SystemOverview.cont'

const RootSystemPage: NextPage = () => {
  const [query, setQuery] = useParam('q')

  return (
    <Fragment>
      <Head>
        <title>Systems Overview</title>
      </Head>
      <SystemOverviewContainer />
    </Fragment>
  )
}

export default RootSystemPage
