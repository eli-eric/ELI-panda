import type { NextPage } from 'next'
import Head from 'next/head'
import { Fragment } from 'react'
import { useIntl } from 'react-intl'

import { message } from '@/i18n/src/messages'
import { AdministrationDashboardContainer } from '@/modules/administration/dashboard/AdministrationDashboard.cont'

const AdministrationPage: NextPage = () => {
    const { formatMessage: fm } = useIntl()

    return (
        <Fragment>
            <Head>
                <title>{fm({ id: message.adminPage.head })}</title>
            </Head>
            <AdministrationDashboardContainer />
        </Fragment>
    )
}

export default AdministrationPage
