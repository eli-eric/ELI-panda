import type { NextPage } from 'next'
import Head from 'next/head'
import { Fragment } from 'react'
import { useIntl } from 'react-intl'
import { message } from 'src/i18n/src/messages'

import LayoutContainer from '@/modules/layout/Layout.cont'

const messages = message.layoutPage

const EliLayoutPage: NextPage = (): JSX.Element => {
    const intl = useIntl()

    return (
        <Fragment>
            <Head>
                <title>{intl.formatMessage({ id: messages.head })}</title>
                <meta name="description" content="...." />
            </Head>
            <LayoutContainer />
        </Fragment>
    )
}

export default EliLayoutPage
