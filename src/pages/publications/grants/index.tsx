import type { NextPage } from 'next'
import Head from 'next/head'
import { Fragment } from 'react'
import { useIntl } from 'react-intl'

import { message } from '@/i18n/src/messages'
import { GrantsContainer } from '@/modules/grants/grants.cont'

const GrantsPage: NextPage = (): JSX.Element => {
    const { formatMessage: fm } = useIntl()

    return (
        <Fragment>
            <Head>
                <title>{fm({ id: message.grantsPage.head })}</title>
                <meta name="description" content={fm({ id: message.grantsPage.description })} />
            </Head>
            <GrantsContainer />
        </Fragment>
    )
}

export default GrantsPage
