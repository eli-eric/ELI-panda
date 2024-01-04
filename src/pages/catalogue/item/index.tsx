import type { NextPage } from 'next'
import Head from 'next/head'
import { Fragment } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { useIntl } from 'react-intl'
import { message } from 'src/i18n/src/messages'

import ErrorPage from '@/components/error/ErrorPage'
import CatalogueItemContainer from '@/modules/catalogueItem/CatalogueItem.cont'

const messages = message.cataloguePage

interface Props {
  catalogueUid?: string
}

const NewCatalogueItemPage: NextPage = ({ catalogueUid }: Props): JSX.Element => {
  const intl = useIntl()
  return (
    <Fragment>
      <Head>
        <title>{intl.formatMessage({ id: messages.head })}</title>
        <meta name="description" content="...." />
      </Head>
      <ErrorBoundary fallback={<ErrorPage />}>
        <CatalogueItemContainer catalogueCategoryUid={catalogueUid} />
      </ErrorBoundary>
    </Fragment>
  )
}

NewCatalogueItemPage.getInitialProps = ({ query }) => ({
  catalogueUid: query.catalogueUid
})

export default NewCatalogueItemPage
