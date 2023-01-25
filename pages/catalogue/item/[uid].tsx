import ItemDetailHeaderComponent from 'components/catalogueItem/header/item-detail-header.comp'
import ItemDetailComponent from 'components/catalogueItem/item-detail.comp'
import ProgressBarComponent from 'components/ui/progress-bar.comp'
import { useCatalogueItemDetailPath } from 'hooks/usePath'
import { message } from 'i18n/src/messages'
import { NextPage } from 'next'
import Head from 'next/head'
import { Fragment, useEffect, useState } from 'react'
import { useIntl } from 'react-intl'
import useSWR from 'swr'
import { CatalogueItem } from 'types/responses'

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
  const catalogueItemPath = useCatalogueItemDetailPath()
  const { data: item } = useSWR<CatalogueItem>(catalogueItemPath)
  const [groups, setGroups] = useState<Array<string>>([])

  useEffect(() => {
    if (item?.details) {
      const uniqueDetailGroups = item.details
        .map(item => item.propertyGroup)
        .filter((value, index, self) => {
          return self.indexOf(value) === index
        })

      setGroups(uniqueDetailGroups)
    }
  }, [item])

  return (
    <Fragment>
      <Head>
        <title>{intl.formatMessage({ id: messages.head })}</title>
        <meta name="description" content="...." />
      </Head>
      <ItemDetailHeaderComponent />
      {item ? <ItemDetailComponent groups={groups} item={item} images={images} /> : <ProgressBarComponent />}
    </Fragment>
  )
}

export default CatalogueItemDetailPage
