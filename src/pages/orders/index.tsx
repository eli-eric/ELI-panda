import type { NextPage } from 'next'
import dynamic from 'next/dynamic'
import Head from 'next/head'
import { Fragment } from 'react'
import { useIntl } from 'react-intl'
import { message } from 'src/i18n/src/messages'

const messages = message.ordersPage

const NoSSROrdersCont = dynamic(() => import('@/modules/orders/Orders.cont'), {
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
      <NoSSROrdersCont />
    </Fragment>
  )
}

export default OrdersPage
