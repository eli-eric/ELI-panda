import type { NextPage } from 'next'
import Head from 'next/head'
import { Fragment } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { useIntl } from 'react-intl'
import { message } from 'src/i18n/src/messages'

import ErrorPage from '@/components/error/ErrorPage'
import CatalogueItemContainer from '@/modules/catalogueItem/CatalogueItem.cont'

const messages = message.cataloguePage

const NewCatalogueItemPage: NextPage = (): JSX.Element => {
  const intl = useIntl()
  return (
    <Fragment>
      <Head>
        <title>{intl.formatMessage({ id: messages.head })}</title>
        <meta name="description" content="...." />
      </Head>
      <ErrorBoundary fallback={<ErrorPage />}>
        <CatalogueItemContainer />
      </ErrorBoundary>
    </Fragment>
  )
}

export default NewCatalogueItemPage
