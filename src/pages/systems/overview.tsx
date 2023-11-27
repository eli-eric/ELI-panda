import type { NextPage } from 'next'
import Head from 'next/head'
import { Fragment } from 'react'

import { useForceChangePassword } from '@/hooks/useForceChangePassword'
import { SystemsContainer } from '@/modules/systems/Systems.cont'

const SystemsPage: NextPage = () => {
  useForceChangePassword()

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
