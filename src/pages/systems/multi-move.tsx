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
        <title>Systems Moving</title>
      </Head>
      <div>MULTI MOVE SYSTEMS</div>
    </Fragment>
  )
}

export default SystemsMovingPage
