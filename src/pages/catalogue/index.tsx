import type { NextPage } from 'next'
import Head from 'next/head'
import { Fragment } from 'react'
import { useIntl } from 'react-intl'

import { message } from '@/i18n/src/messages'
import dynamic from 'next/dynamic'

const { head } = message.cataloguePage

const NoSSRCatalogueCont = dynamic(
  () => import('@/modules/catalogue/Catalogue.cont'),
  {
    ssr: false
  }
)

const CatalogueCategoryHomePage: NextPage = (): JSX.Element => {
  const intl = useIntl()

  return (
    <Fragment>
      <Head>
        <title>{intl.formatMessage({ id: head })}</title>
        <meta name="description" content="...." />
      </Head>
      <NoSSRCatalogueCont />
    </Fragment>
  )
}

export default CatalogueCategoryHomePage
