import type { NextPage } from 'next'
import dynamic from 'next/dynamic'
import Head from 'next/head'
import { Fragment } from 'react'

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
        <title>Systems Overview</title>
      </Head>
      <SystemsContainer />
    </Fragment>
  )
}

export default SystemsPage
