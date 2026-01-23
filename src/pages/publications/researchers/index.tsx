import type { NextPage } from 'next'
import Head from 'next/head'
import { Fragment } from 'react'

import { ResearchersContainer } from '@/modules/researchers/researchers.cont'

const ResearchersPage: NextPage = (): JSX.Element => {
  return (
    <Fragment>
      <Head>
        <title>Researchers</title>
        <meta name="description" content="Manage researchers" />
      </Head>
      <ResearchersContainer />
    </Fragment>
  )
}

export default ResearchersPage
