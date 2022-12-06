import { CatalogueItem } from 'core/types/responses'
import { useEffect, useState } from 'react'
import useSWR from 'swr'

import { useCatalogueItemDetailPath } from '../hooks/usePath'
import ItemDetailComponent from './item-detail.comp'

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

export default function Example() {
  const catalogueItemPath = useCatalogueItemDetailPath()
  const [groups, setGroups] = useState<Array<string>>([])
  const { data: item } = useSWR<CatalogueItem>(catalogueItemPath)

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

  return <ItemDetailComponent item={item} groups={groups} images={images} />
}
