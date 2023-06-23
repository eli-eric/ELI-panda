import type { NextPage } from 'next'
import Head from 'next/head'
import { Fragment } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { useIntl } from 'react-intl'
import { message } from 'src/i18n/src/messages'

import ErrorPage from '@/components/error/ErrorPage'
import LoaderComponent from '@/components/loader.comp'
import CatalogueItemContainer from '@/modules/catalogueItem/CatalogueItem.cont'
import useItem from '@/modules/catalogueItem/hooks/useItem'

const messages = message.cataloguePage

const ItemContainer = () => {
  const { item } = useItem()
  return <Fragment>{item ? <CatalogueItemContainer /> : <LoaderComponent />}</Fragment>
}

const CatalogueItemDetailPage: NextPage = (): JSX.Element => {
  const intl = useIntl()
  return (
    <Fragment>
      <Head>
        <title>{intl.formatMessage({ id: messages.head })}</title>
        <meta name="description" content="...." />
      </Head>
      <ErrorBoundary fallback={<ErrorPage />}>
        <ItemContainer />
      </ErrorBoundary>
    </Fragment>
  )
}

export default CatalogueItemDetailPage
