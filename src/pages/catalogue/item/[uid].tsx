import { NextPage } from 'next'
import Head from 'next/head'
import { Fragment, Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { useIntl } from 'react-intl'
import ItemDetailHeaderComponent from 'src/components/catalogueItem/header/item-detail-header.comp'
import ItemDetailComponent from 'src/components/catalogueItem/item-detail.comp'
import ErrorPage from 'src/components/error/ErrorPage'
import LoaderComponent from 'src/components/ui/loader.comp'
import { message } from 'src/i18n/src/messages'

const messages = message.cataloguePage

const images = [
  {
    id: 1,
    src: 'http://localhost:5001/api/mock-server/catalogue/item/0056ed5a-e20b-4c15-b8c6-2312c23b1f4a/image',
    alt: '',
    name: ''
  },
  {
    id: 2,
    src: 'http://localhost:5001/api/mock-server/catalogue/item/1865aed8-f94d-49eb-8389-3b4fc5d983ab/image',
    alt: '',
    name: ''
  },
  {
    id: 3,
    src: 'http://localhost:5001/api/mock-server/catalogue/item/c664c559-650d-4733-90fe-74cef6c04186/image',
    alt: '',
    name: ''
  }
]

const CatalogueItemDetailPage: NextPage = (): JSX.Element => {
  const intl = useIntl()

  return (
    <Fragment>
      <Head>
        <title>{intl.formatMessage({ id: messages.head })}</title>
        <meta name="description" content="...." />
      </Head>
      <ItemDetailHeaderComponent />
      <ErrorBoundary fallback={<ErrorPage />}>
        <Suspense fallback={<LoaderComponent />}>
          <ItemDetailComponent images={images} />
        </Suspense>
      </ErrorBoundary>
    </Fragment>
  )
}

export default CatalogueItemDetailPage
