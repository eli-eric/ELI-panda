import ItemDetailContainer from 'modules/catalogue/item-detail/item-detail.cont'
import { message } from 'i18n/src/messages'
import { NextPage } from 'next'
import Head from 'next/head'
import { Fragment } from 'react'
import { useIntl } from 'react-intl'

const messages = message.cataloguePage

const CatalogueItemDetailPage: NextPage = (): JSX.Element => {
  const intl = useIntl()

  return (
    <Fragment>
      <Head>
        <title>{intl.formatMessage({ id: messages.head })}</title>
        <meta name="description" content="...." />
      </Head>
      <ItemDetailContainer />
    </Fragment>
  )
}

export default CatalogueItemDetailPage
