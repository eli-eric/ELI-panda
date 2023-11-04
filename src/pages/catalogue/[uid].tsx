import type { NextPage, NextPageContext } from 'next'
import Head from 'next/head'
import { Fragment, memo } from 'react'
import { useIntl } from 'react-intl'

import { message } from '@/i18n/src/messages'
import CatalogueContainer from '@/modules/catalogue/Catalogue.cont'

const { head } = message.cataloguePage

const MemoizedCatalogueContainer = memo(CatalogueContainer)
type CatalogueCategoryPageProps = {
  uid?: string
}

const CatalogueCategoryPage: NextPage = ({ uid }: CatalogueCategoryPageProps): JSX.Element => {
  const intl = useIntl()

  return (
    <Fragment>
      <Head>
        <title>{intl.formatMessage({ id: head })}</title>
        <meta name="description" content="...." />
      </Head>
      <MemoizedCatalogueContainer uid={uid} />
    </Fragment>
  )
}

CatalogueCategoryPage.getInitialProps = ({ query }: NextPageContext) => ({
  key: query.uid,
  uid: query.uid
})

export default CatalogueCategoryPage
