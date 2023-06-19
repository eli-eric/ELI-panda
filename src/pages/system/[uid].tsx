import type { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { useIntl } from 'react-intl'
import { message } from 'src/i18n/src/messages'

import ErrorPage from '@/components/error/ErrorPage'
import LoaderComponent from '@/components/loader.comp'
import { useEndpoint } from '@/hooks/fetch/useEndpoint'
import useFetch from '@/hooks/fetch/useFetch'
import SystemItemContainer from '@/modules/systemItem/SystemItem.cont'

const messages = message.systemItem

const SystemContainer = (): React.ReactElement => {
  const router = useRouter()
  const { uid } = router.query as { uid: string }
  const { systemSubsystems } = useEndpoint({ uid })
  const { response } = useFetch({ url: uid && systemSubsystems })

  return <>{response && <SystemItemContainer />}</>
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
