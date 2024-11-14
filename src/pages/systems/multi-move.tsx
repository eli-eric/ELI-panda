import type { NextPage } from 'next'
import dynamic from 'next/dynamic'
import Head from 'next/head'
import { Fragment } from 'react'

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
        <title>Systems Moving</title>
      </Head>
      <SystemsMultiMove />
    </Fragment>
  )
}

export default SystemsMovingPage
