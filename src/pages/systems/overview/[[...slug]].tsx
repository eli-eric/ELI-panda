import { NextPage } from 'next'
import Head from 'next/head'
import { Fragment, lazy, Suspense } from 'react'
import { useIntl } from 'react-intl'
import LoaderComponent from 'src/components/ui/loader.comp'
import { message } from 'src/i18n/src/messages'

const SystemsOverviewContainer = lazy(
  () => import('src/modules/systems/systems-overview.cont'),
)

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
