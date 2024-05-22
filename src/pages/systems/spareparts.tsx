import type { NextPage } from 'next'
import dynamic from 'next/dynamic'
import Head from 'next/head'
import { Fragment } from 'react'

const SystemsSparePartsContainer = dynamic(
  () => import('@/modules/systemsSpareParts/SystemSpareParts.cont'),
  {
    ssr: false
  }
)

const SystemsPage: NextPage = () => {
  return (
    <Fragment>
      <Head>
        <title>Spare Parts</title>
      </Head>
      <SystemsSparePartsContainer />
    </Fragment>
  )
}

export default SystemsPage
