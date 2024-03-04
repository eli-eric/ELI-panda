import type { NextPage } from 'next'
import Head from 'next/head'
import { Fragment, Suspense } from 'react'
import { useIntl } from 'react-intl'

import LoaderComponent from '@/components/loader.comp'
import { useForceChangePassword } from '@/hooks/useForceChangePassword'
import { message } from '@/i18n/src/messages'
import CatalogueContainer from '@/modules/catalogue/Catalogue.cont'

const { head } = message.cataloguePage

const CatalogueCategoryHomePage: NextPage = (): JSX.Element => {
  const intl = useIntl()
  useForceChangePassword()

  return (
    <Fragment>
      <Head>
        <title>{intl.formatMessage({ id: head })}</title>
        <meta name="description" content="...." />
      </Head>
      <Suspense fallback={<LoaderComponent />}>
        <CatalogueContainer />
      </Suspense>
    </Fragment>
  )
}

export default CatalogueCategoryHomePage
