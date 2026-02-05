import type { NextPage } from 'next'
import Head from 'next/head'
import { Fragment } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { useIntl } from 'react-intl'
import { message } from 'src/i18n/src/messages'

import ErrorPage from '@/components/error/ErrorPage'
import LoaderComponent from '@/components/loader.comp'
import useOrderDetail from '@/modules/orderItem/hooks/useOrderDetail'
import { OrderItemContainer } from '@/modules/orderItem/OrderItem.cont'

const messages = message.orderItem

const OrderContainer = (): JSX.Element => {
    const { orderDetail, error } = useOrderDetail()

    if (error) return <ErrorPage />
    return <Fragment>{orderDetail ? <OrderItemContainer /> : <LoaderComponent />}</Fragment>
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
                <OrderContainer />
            </ErrorBoundary>
        </Fragment>
    )
}

OrderItemPage.getInitialProps = ({ query }) => ({
    key: query.uid,
})

export default OrderItemPage
