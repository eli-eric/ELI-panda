import type { NextPage } from 'next'
import Head from 'next/head'
import { Fragment } from 'react'
import { useIntl } from 'react-intl'
import { message } from 'src/i18n/src/messages'

import { ServiceTypeContainer } from '@/modules/serviceTypeItem/ServiceType.cont'

const messages = message.service

interface Props {
  uid?: string
}

const ServiceDetailPage: NextPage = ({ uid }: Props) => {
  const intl = useIntl()
  return (
    <Fragment>
      <Head>
        <title>{intl.formatMessage({ id: messages.head })}</title>
        <meta name="description" content="...." />
      </Head>
      <ServiceTypeContainer uid={uid} />
    </Fragment>
  )
}

ServiceDetailPage.getInitialProps = ({ query }) => ({
  key: query.uid,
  uid: query.uid
})

export default ServiceDetailPage
