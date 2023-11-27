import type { NextPage, NextPageContext } from 'next'
import Head from 'next/head'
import { createContext, Fragment } from 'react'
import { useIntl } from 'react-intl'

import { useForceChangePassword } from '@/hooks/useForceChangePassword'
import { message } from '@/i18n/src/messages'
import CatalogueContainer from '@/modules/catalogue/Catalogue.cont'

const { head } = message.cataloguePage

type CatalogueCategoryPageProps = {
  uid?: string
}

type CatalogueContextType = {
  uid?: string
}

export const CatalogueContext = createContext<CatalogueContextType>({})

const CatalogueCategoryPage: NextPage = ({ uid }: CatalogueCategoryPageProps): JSX.Element => {
  const intl = useIntl()
  useForceChangePassword()

  return (
    <Fragment>
      <Head>
        <title>{intl.formatMessage({ id: head })}</title>
        <meta name="description" content="...." />
      </Head>
      <CatalogueContext.Provider value={{ uid }}>
        <CatalogueContainer />
      </CatalogueContext.Provider>
    </Fragment>
  )
}

CatalogueCategoryPage.getInitialProps = ({ query }: NextPageContext) => ({
  key: query.uid,
  uid: query.uid
})

export default CatalogueCategoryPage
