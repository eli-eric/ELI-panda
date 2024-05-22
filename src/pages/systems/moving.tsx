import type { NextPage } from 'next'
import dynamic from 'next/dynamic'
import Head from 'next/head'
import { Fragment } from 'react'

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
        <title>Systems Overview</title>
      </Head>
      <SystemsMovingContainer />
    </Fragment>
  )
}

export default SystemsMovingPage
