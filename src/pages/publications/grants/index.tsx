import type { NextPage } from 'next'
import Head from 'next/head'
import { Fragment } from 'react'

import { GrantsContainer } from '@/modules/grants/grants.cont'

const GrantsPage: NextPage = (): JSX.Element => {
    return (
        <Fragment>
            <Head>
                <title>Grants</title>
                <meta name="description" content="Manage grants" />
            </Head>
            <GrantsContainer />
        </Fragment>
    )
}

export default GrantsPage
