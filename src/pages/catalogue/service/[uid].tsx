import type { NextPage } from 'next'
import Head from 'next/head'
import { Fragment } from 'react'
import { useIntl } from 'react-intl'
import { message } from 'src/i18n/src/messages'

import ErrorPage from '@/components/error/ErrorPage'
import { useServiceType } from '@/modules/services/hooks/useServiceType'
import { ServiceTypeContainer } from '@/modules/serviceTypeItem/ServiceType.cont'

const messages = message.service

interface Props {
  uid?: string
}

const ServiceDetailPage: NextPage = ({ uid }: Props) => {
  const intl = useIntl()
  const { data, isLoading, error } = useServiceType(uid)
  if (error) {
    return <ErrorPage />
  }
  return (
    <Fragment>
      <Head>
        <title>{intl.formatMessage({ id: messages.head })}</title>
        <meta name="description" content="...." />
      </Head>
      {isLoading && <div>Loading...</div>}
      {data && <ServiceTypeContainer uid={uid} data={data} />}
    </Fragment>
  )
}

ServiceDetailPage.getInitialProps = ({ query }) => ({
  key: query.uid,
  uid: query.uid
})

export default ServiceDetailPage
