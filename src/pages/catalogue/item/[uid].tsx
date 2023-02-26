import { NextPage } from 'next'
import Head from 'next/head'
import { Fragment, Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { useIntl } from 'react-intl'
import ItemDetailHeaderComponent from 'src/components/catalogueItem/header/item-detail-header.comp'
import ItemDetailComponent from 'src/components/catalogueItem/item-detail.comp'
import { message } from 'src/i18n/src/messages'

import ErrorPage from '@/components/shared/error/ErrorPage'
import LoaderComponent from '@/components/shared/loader.comp'

const messages = message.cataloguePage

const CatalogueItemDetailPage: NextPage = (): JSX.Element => {
  const intl = useIntl()

  return (
    <Fragment>
      <Head>
        <title>{intl.formatMessage({ id: messages.head })}</title>
        <meta name="description" content="...." />
      </Head>
      <ItemDetailHeaderComponent />
      <ErrorBoundary fallback={<ErrorPage />}>
        <Suspense fallback={<LoaderComponent />}>
          <ItemDetailComponent />
        </Suspense>
      </ErrorBoundary>
    </Fragment>
  )
}

export default CatalogueItemDetailPage
