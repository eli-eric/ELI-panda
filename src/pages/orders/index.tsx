import { NextPage } from 'next'
import Head from 'next/head'
import { Fragment } from 'react'
import { useIntl } from 'react-intl'
import { message } from 'src/i18n/src/messages'

import { useSearch } from '@/hooks/useSearch'
import { CatalogLayoutContainer } from '@/modules/catalogue/layout/catalog-layout.cont'

const messages = message.ordersPage

const OrdersPage: NextPage = (): JSX.Element => {
  const intl = useIntl()
  const { renderSearchBar } = useSearch({})

  return (
    <Fragment>
      <Head>
        <title>{intl.formatMessage({ id: messages.head })}</title>
        <meta name="description" content="...." />
      </Head>
      <CatalogLayoutContainer>{renderSearchBar()}</CatalogLayoutContainer>
    </Fragment>
  )
}

export default OrdersPage
