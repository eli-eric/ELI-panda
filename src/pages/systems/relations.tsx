import type { NextPage } from 'next'
import dynamic from 'next/dynamic'
import Head from 'next/head'
import { Fragment } from 'react'
import { FormattedMessage } from 'react-intl'

import { messages } from '@/i18n/src/locale/en'

const SystemRelationsContainer = dynamic(
    () => import('@/modules/systemsRelations/SystemRelations.cont'),
    {
        ssr: false,
    },
)

const SystemRelationsPage: NextPage = () => {
    return (
        <Fragment>
            <Head>
                <title>
                    <FormattedMessage id={messages.common.pages.systemRelations} />
                </title>
            </Head>
            <SystemRelationsContainer />
        </Fragment>
    )
}

export default SystemRelationsPage
