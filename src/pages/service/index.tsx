import type { NextPage } from 'next'
import Head from 'next/head'
import { Fragment } from 'react'
import { useIntl } from 'react-intl'
import { message } from 'src/i18n/src/messages'

import { ServiceTypeContainer } from '@/modules/serviceTypeItem/ServiceType.cont'

const messages = message.service

const ServiceDetailPage: NextPage = () => {
    const intl = useIntl()
    return (
        <Fragment>
            <Head>
                <title>{intl.formatMessage({ id: messages.head })}</title>
                <meta name="description" content="...." />
            </Head>
            <ServiceTypeContainer />
        </Fragment>
    )
}

export default ServiceDetailPage
