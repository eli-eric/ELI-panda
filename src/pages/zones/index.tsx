import type { NextPage } from 'next'
import Head from 'next/head'
import { Fragment } from 'react'
import { useIntl } from 'react-intl'

import { message } from '@/i18n/src/messages'
import { ZonesContainer } from '@/modules/zones/zones.cont'

const ZonesPage: NextPage = (): JSX.Element => {
    const { formatMessage: fm } = useIntl()

    return (
        <Fragment>
            <Head>
                <title>{fm({ id: message.zonesPage.head })}</title>
                <meta
                    name="description"
                    content={fm({ id: message.zonesPage.description })}
                />
            </Head>
            <ZonesContainer />
        </Fragment>
    )
}

export default ZonesPage
