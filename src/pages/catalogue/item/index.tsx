import type { NextPage } from 'next'
import Head from 'next/head'
import { Fragment } from 'react'
import { useIntl } from 'react-intl'
import { message } from 'src/i18n/src/messages'

import CatalogueItemContainer from '@/modules/catalogueItem/CatalogueItem.cont'

const messages = message.cataloguePage

interface Props {
  categoryUid?: string
}

const NewCatalogueItemPage: NextPage = ({
  categoryUid
}: Props): JSX.Element => {
  const intl = useIntl()
  return (
    <Fragment>
      <Head>
        <title>{intl.formatMessage({ id: messages.head })}</title>
        <meta name="description" content="...." />
      </Head>
      <CatalogueItemContainer catalogueCategoryUid={categoryUid} />
    </Fragment>
  )
}

NewCatalogueItemPage.getInitialProps = ({ query }) => ({
  categoryUid: query.categoryUid
})

export default NewCatalogueItemPage
