import type { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { Fragment, Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { useIntl } from 'react-intl'
import { message } from 'src/i18n/src/messages'

import ErrorPage from '@/components/error/ErrorPage'
import LoaderComponent from '@/components/loader.comp'
import { useEndpoint } from '@/hooks/fetch/useEndpoint'
import useFetch from '@/hooks/useFetch'
import OrderItemContainer from '@/modules/orderItem/OrderItem.cont'
import type { OrderDetailFormType } from '@/modules/orderItem/types'

const messages = message.orderItem

const OrderContainer = (): JSX.Element => {
  const router = useRouter()
  const { uid } = router.query as { uid: string }
  const { order } = useEndpoint({ uid })
  const { response } = useFetch<OrderDetailFormType>({ url: order })
  return <Fragment>{response && <OrderItemContainer OrderDetail={response} />}</Fragment>
}

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
          <OrderContainer />
        </Suspense>
      </ErrorBoundary>
    </Fragment>
  )
}

export default OrderItemPage
