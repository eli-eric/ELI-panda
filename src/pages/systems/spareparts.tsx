import type { NextPage } from 'next'
import Head from 'next/head'
import { Fragment } from 'react'

import { useForceChangePassword } from '@/hooks/useForceChangePassword'

const SystemsPage: NextPage = () => {
  useForceChangePassword()

  return (
    <Fragment>
      <Head>
        <title>Spare Parts</title>
      </Head>
      <h1>Systems Spare Parts</h1>
    </Fragment>
  )
}

export default SystemsPage
