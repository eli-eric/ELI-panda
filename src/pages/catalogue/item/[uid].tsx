import type { NextPage } from 'next'
import Head from 'next/head'
import { Fragment } from 'react'
import { useIntl } from 'react-intl'
import { message } from 'src/i18n/src/messages'

import ErrorPage from '@/components/error/ErrorPage'
import LoaderComponent from '@/components/loader.comp'
import CatalogueItemContainer from '@/modules/catalogueItem/CatalogueItem.cont'
import { useCatalogueItem } from '@/modules/catalogueItem/hooks/useItem'

const messages = message.cataloguePage

const ItemContainer = ({ uid }: { uid?: string }) => {
  const { item, error } = useCatalogueItem()
  if (error) return <ErrorPage />
  return (
    <Fragment>
      {item ? <CatalogueItemContainer uid={uid} /> : <LoaderComponent />}
    </Fragment>
  )
}

interface Props {
  uid?: string
}

const CatalogueItemDetailPage: NextPage = ({ uid }: Props) => {
  const intl = useIntl()
  return (
    <Fragment>
      <Head>
        <title>{intl.formatMessage({ id: messages.head })}</title>
        <meta name="description" content="...." />
      </Head>
      <ItemContainer uid={uid} />
    </Fragment>
  )
}

CatalogueItemDetailPage.getInitialProps = ({ query }) => ({
  key: query.uid,
  uid: query.uid
})

export default CatalogueItemDetailPage
