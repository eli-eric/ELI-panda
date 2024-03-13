import type { NextPage } from 'next'
import Head from 'next/head'
import { Fragment } from 'react'

import { SystemsSparePartsContainer } from '@/modules/systemsSpareParts/SystemSpareParts.cont'

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
