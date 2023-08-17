import type { NextPage } from 'next'
import Head from 'next/head'
import { Fragment, Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { useIntl } from 'react-intl'
import { message } from 'src/i18n/src/messages'

import ErrorPage from '@/components/error/ErrorPage'
import LoaderComponent from '@/components/loader.comp'
import { OrderItemContainer } from '@/modules/orderItem/OrderItem.cont'

const messages = message.orderItem

const OrderItemPage: NextPage = (): JSX.Element => {
  const intl = useIntl()
  return (
    <Fragment>
      <Head>
        <title>{intl.formatMessage({ id: messages.head })}</title>
        <meta name="description" content="...." />
      </Head>
      <ErrorBoundary fallback={<ErrorPage />}>
        <Suspense fallback={<LoaderComponent />}>
          <OrderItemContainer />
        </Suspense>
      </ErrorBoundary>
    </Fragment>
  )
}

export default OrderItemPage
