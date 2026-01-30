import type { NextPage } from 'next'
import Head from 'next/head'
import { Fragment } from 'react'
import { useIntl } from 'react-intl'
import { message } from 'src/i18n/src/messages'

import { PublicationUpdateContainer } from '@/modules/publication/publication-update.cont'

const messages = message.publication

const PublicationDetailPage: NextPage = (): JSX.Element => {
    const intl = useIntl()
    return (
        <Fragment>
            <Head>
                <title>{intl.formatMessage({ id: messages.head })}</title>
                <meta name="description" content="...." />
            </Head>
            <PublicationUpdateContainer />
        </Fragment>
    )
}

PublicationDetailPage.getInitialProps = ({ query }) => ({
    key: query.uid,
})

export default PublicationDetailPage
