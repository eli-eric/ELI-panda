import type { NextPage } from 'next'
import dynamic from 'next/dynamic'
import Head from 'next/head'
import { Fragment } from 'react'
import { useIntl } from 'react-intl'

import { message } from '@/i18n/src/messages'

const ControlSystemsOverviewContainer = dynamic(
    () => import('@/modules/control-systems/ControlSystemsOverview.cont'),
    {
        ssr: false,
    },
)

const ControlSystemsOverviewPage: NextPage = () => {
    const { formatMessage: fm } = useIntl()

    return (
        <Fragment>
            <Head>
                <title>{fm({ id: message.controlSystems.pages.overview })}</title>
            </Head>
            <ControlSystemsOverviewContainer />
        </Fragment>
    )
}

export default ControlSystemsOverviewPage
