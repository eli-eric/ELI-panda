import type { NextPage } from 'next'
import Head from 'next/head'
import { Fragment } from 'react'
import { useIntl } from 'react-intl'
import { message } from 'src/i18n/src/messages'

import ErrorPage from '@/components/error/ErrorPage'
import LoaderComponent from '@/components/loader.comp'
import { useSystemDetail } from '@/modules/systemItem/hooks/useSystemDetail'
import { SystemItemContainer } from '@/modules/systemItem/SystemItem.cont'

const messages = message.systemItem

interface Props {
    key?: string
    uid?: string
}

const SystemDetailPage: NextPage = ({ uid }: Props) => {
    const intl = useIntl()
    const { systemDetail, loading, error } = useSystemDetail()

    if (loading) {
        return <LoaderComponent />
    }

    if (error) {
        return <ErrorPage />
    }

    return (
        <Fragment>
            <Head>
                <title>{intl.formatMessage({ id: messages.head })}</title>
                <meta name="description" content="...." />
            </Head>
            <div className="min-h-screen bg-background">
                {systemDetail && <SystemItemContainer uid={uid} />}
            </div>
        </Fragment>
    )
}

SystemDetailPage.getInitialProps = ({ query }) => ({
    key: query.uid,
    uid: query.uid,
})

export default SystemDetailPage
