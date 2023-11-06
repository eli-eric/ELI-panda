import type { NextPage } from 'next'
import Head from 'next/head'
import { Fragment, Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { useIntl } from 'react-intl'
import { message } from 'src/i18n/src/messages'

import ErrorPage from '@/components/error/ErrorPage'
import LoaderComponent from '@/components/loader.comp'
import { SystemItemContainer } from '@/modules/systemItem/SystemItem.cont'

const messages = message.systemItem

interface Props {
  key?: string
  uid?: string
}

const SystemDetailPage: NextPage = ({ uid }: Props) => {
  const intl = useIntl()

  return (
    <Fragment>
      <Head>
        <title>{intl.formatMessage({ id: messages.head })}</title>
        <meta name="description" content="...." />
      </Head>
      <ErrorBoundary fallback={<ErrorPage />}>
        <Suspense fallback={<LoaderComponent />}>
          <SystemItemContainer uid={uid} />
        </Suspense>
      </ErrorBoundary>
    </Fragment>
  )
}

SystemDetailPage.getInitialProps = ({ query }) => ({
  key: query.uid,
  uid: query.uid
})

export default SystemDetailPage
