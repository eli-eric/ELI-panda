import type { NextPage } from 'next'
import Head from 'next/head'
import { Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { useIntl } from 'react-intl'
import { message } from 'src/i18n/src/messages'

import ErrorPage from '@/components/error/ErrorPage'
import LoaderComponent from '@/components/loader.comp'
import useSystemDetail from '@/modules/systemItem/hooks/useSystemDetail'
import SystemItemContainer from '@/modules/systemItem/SystemItem.cont'

const messages = message.systemItem

const SystemContainer = (): React.ReactElement => {
  const { systemDetail } = useSystemDetail()

  return <>{systemDetail && <SystemItemContainer />}</>
}

const SystemDetailPage: NextPage = () => {
  const intl = useIntl()

  return (
    <>
      <Head>
        <title>{intl.formatMessage({ id: messages.head })}</title>
        <meta name="description" content="...." />
      </Head>
      <ErrorBoundary fallback={<ErrorPage />}>
        <Suspense fallback={<LoaderComponent />}>
          <SystemContainer />
        </Suspense>
      </ErrorBoundary>
    </>
  )
}

export default SystemDetailPage
