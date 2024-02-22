import type { NextPage } from 'next'
import Head from 'next/head'
import { Fragment } from 'react'

import { useForceChangePassword } from '@/hooks/useForceChangePassword'
import { SystemsSparePartsContainer } from '@/modules/systemsSpareParts/SystemSpareParts.cont'

const SystemsPage: NextPage = () => {
  useForceChangePassword()

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
