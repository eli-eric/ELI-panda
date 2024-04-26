import type { NextPage } from 'next'
import Head from 'next/head'
import { Fragment, useEffect, useState } from 'react'
import { useIntl } from 'react-intl'

import { message } from '@/i18n/src/messages'
import CatalogueContainer from '@/modules/catalogue/Catalogue.cont'

const { head } = message.cataloguePage

const CatalogueCategoryHomePage: NextPage = (): JSX.Element => {
  const intl = useIntl()

  //HOT FIX
  const [isClient, setIsClient] = useState(false)
  useEffect(() => {
    setIsClient(true)
  }, [])

  return (
    <Fragment>
      <Head>
        <title>{intl.formatMessage({ id: head })}</title>
        <meta name="description" content="...." />
      </Head>
      {isClient && <CatalogueContainer />}
    </Fragment>
  )
}

export default CatalogueCategoryHomePage
