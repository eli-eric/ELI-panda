import type { NextPage } from 'next'
import Head from 'next/head'
import { Fragment } from 'react'
import { useIntl } from 'react-intl'

import { message } from '@/i18n/src/messages'
import { PublicationsAnalyticsContainer } from '@/modules/publications/analytics/publications-analytics.cont'

const messages = message.publicationsAnalytics

const PublicationsAnalyticsPage: NextPage = (): JSX.Element => {
    const { formatMessage: fm } = useIntl()

    return (
        <Fragment>
            <Head>
                <title>{fm({ id: messages.head })}</title>
                <meta name="description" content={fm({ id: messages.description })} />
            </Head>
            <PublicationsAnalyticsContainer />
        </Fragment>
    )
}

export default PublicationsAnalyticsPage
