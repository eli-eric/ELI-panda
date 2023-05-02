import { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import { Fragment } from 'react'
import { useIntl } from 'react-intl'
import { message } from 'src/i18n/src/messages'
import useSWR from 'swr'

import LoaderComponent from '@/components/loader.comp'
import { fetcher } from '@/helpers/fetcher'
import { useEndpoint } from '@/hooks/useEndpoint'
import OrderItemContainer from '@/modules/orderItem/OrderItem.cont'

const messages = message.orderItem

const OrderItemPage: NextPage = (): JSX.Element => {
  const intl = useIntl()
  const { data: session } = useSession()
  const router = useRouter()
  const uid = router.query.uid as string
  const { order } = useEndpoint({ uid })

  const { data } = useSWR(session && order, fetcher, { suspense: false })

  return (
    <Fragment>
      <Head>
        <title>{intl.formatMessage({ id: messages.head })}</title>
        <meta name="description" content="...." />
      </Head>
      <Fragment>
        <Head>
          <title>{intl.formatMessage({ id: messages.head })}</title>
          <meta name="description" content="...." />
        </Head>
        {data ? <OrderItemContainer OrderDetail={data} /> : <LoaderComponent />}
      </Fragment>
    </Fragment>
  )
}

export default OrderItemPage
