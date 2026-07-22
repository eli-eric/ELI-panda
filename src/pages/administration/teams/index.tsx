import type { NextPage } from 'next'
import dynamic from 'next/dynamic'
import Head from 'next/head'
import { Fragment } from 'react'
import { useIntl } from 'react-intl'

import { message } from '@/i18n/src/messages'

const TeamsExplorerContainer = dynamic(
    () => import('@/modules/administration/teams/TeamsExplorer.cont'),
    { ssr: false },
)

const TeamsPage: NextPage = () => {
    const { formatMessage: fm } = useIntl()

    return (
        <Fragment>
            <Head>
                <title>{fm({ id: message.teamsPage.head })}</title>
            </Head>
            <TeamsExplorerContainer />
        </Fragment>
    )
}

export default TeamsPage
