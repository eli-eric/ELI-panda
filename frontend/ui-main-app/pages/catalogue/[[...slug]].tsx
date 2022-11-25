import CatalogueContainer from 'core/components/modules/catalogue/catalogue.cont'
import { message } from 'core/i18n/src/messages'
import { NextPage } from 'next'
import Head from 'next/head'
import { Fragment } from 'react'
import { useIntl } from 'react-intl'

const messages = message.cataloguePage

const CatalogueSubCategory: NextPage = (): JSX.Element => {
  const intl = useIntl()

  return (
    <Fragment>
      <Head>
        <title>{intl.formatMessage({ id: messages.head })}</title>
        <meta name="description" content="...." />
      </Head>
      <CatalogueContainer />
    </Fragment>
  )
}

export default CatalogueSubCategory
