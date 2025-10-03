import type { NextPage } from 'next'
import Head from 'next/head'
import { Fragment } from 'react'
import { FormattedMessage } from 'react-intl'

import ErrorPage from '@/components/error/ErrorPage'
import { messages } from '@/i18n/src/locale/en'
import { useServiceType } from '@/modules/services/hooks/useServiceType'
import { ServiceTypeContainer } from '@/modules/serviceTypeItem/ServiceType.cont'

interface Props {
  uid?: string
}

const ServiceDetailPage: NextPage = ({ uid }: Props) => {
  const { data, isLoading, error } = useServiceType(uid)
  if (error) {
    return <ErrorPage />
  }
  return (
    <Fragment>
      <Head>
        <title>
          <FormattedMessage id={messages.common.pages.service} />
        </title>
        <meta name="description" content="...." />
      </Head>
      {isLoading && (
        <div>
          <FormattedMessage id={messages.common.pages.loading} />
        </div>
      )}
      {data && <ServiceTypeContainer uid={uid} data={data} />}
    </Fragment>
  )
}

ServiceDetailPage.getInitialProps = ({ query }) => ({
  key: query.uid,
  uid: query.uid
})

export default ServiceDetailPage
