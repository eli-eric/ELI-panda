import LoaderComponent from 'core/components/ui/loader.comp'
import { message } from 'core/i18n/src/messages'
import { NextPage } from 'next'
import Head from 'next/head'
import { Fragment, lazy, Suspense } from 'react'
import { useIntl } from 'react-intl'

const SystemsOverviewContainer = lazy(() => import('core/components/modules/systems/systems-overview.cont'))

const messages = message.systemsPage

const ReportsPage: NextPage = (): JSX.Element => {
  const intl = useIntl()

  return (
    <Fragment>
      <Head>
        <title>{intl.formatMessage({ id: messages.head })}</title>
        <meta name="description" content="...." />
      </Head>
      <Suspense fallback={<LoaderComponent />}>
        <SystemsOverviewContainer />
      </Suspense>
    </Fragment>
  )
}

export default ReportsPage
