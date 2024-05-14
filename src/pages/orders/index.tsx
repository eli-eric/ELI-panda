import type { NextPage } from 'next'
import Head from 'next/head'
import { Fragment } from 'react'
import { useIntl } from 'react-intl'
import { message } from 'src/i18n/src/messages'

import dynamic from 'next/dynamic'

const messages = message.ordersPage

const OrdersContainer = dynamic(() => import('@/modules/orders/Orders.cont'), {
  ssr: false
})

const OrdersPage: NextPage = (): JSX.Element => {
  const intl = useIntl()

  return (
    <Fragment>
      <Head>
        <title>{intl.formatMessage({ id: messages.head })}</title>
        <meta name="description" content="...." />
      </Head>
      <OrdersContainer />
    </Fragment>
  )
}

export default OrdersPage
