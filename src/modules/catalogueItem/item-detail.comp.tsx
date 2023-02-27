import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import useSWR from 'swr'

import { useEndpoint } from '@/hooks/useEndpoint'
import { CatalogueItem } from '@/types/responses'

import ItemPropertiesComponent from './default-properties/item-properties.comp'
import ImageGalleryComponent from './gallery/image-gallery.comp'

const images = [
  {
    id: 1,
    src: 'http://localhost:5001/api/mock-server/catalogue/item/0056ed5a-e20b-4c15-b8c6-2312c23b1f4a/image',
    alt: '',
    name: '',
  },
  {
    id: 2,
    src: 'http://localhost:5001/api/mock-server/catalogue/item/1865aed8-f94d-49eb-8389-3b4fc5d983ab/image',
    alt: '',
    name: '',
  },
  {
    id: 3,
    src: 'http://localhost:5001/api/mock-server/catalogue/item/c664c559-650d-4733-90fe-74cef6c04186/image',
    alt: '',
    name: '',
  },
]

interface Props {
  uid?: string
}

const ItemDetailComponent = ({ uid }: Props) => {
  const router = useRouter()
  const catalogueUid = (router.query.uid as string) || uid
  const [groups, setGroups] = useState<Array<string>>([])
  const { catalogueItem } = useEndpoint({
    uid: catalogueUid,
  })
  const { data: item } = useSWR<CatalogueItem>(catalogueUid && catalogueItem)

  useEffect(() => {
    if (item?.details) {
      const uniqueDetailGroups = item.details
        .map(item => item.propertyGroup)
        .filter((value, index, self) => self.indexOf(value) === index)

      setGroups(uniqueDetailGroups)
    }
  }, [item])
  return (
    <div className="bg-white pb-10">
      <main className="mx-auto max-w-7xl sm:px-6 sm:pt-16 lg:px-8 h-full overflow-auto">
        <div className="mx-auto max-w-2xl lg:max-w-none">
          <div className="lg:grid lg:grid-cols-3 lg:items-start lg:gap-x-8">
            <ImageGalleryComponent images={images} />

            <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0 col-span-2">
              <h1 className="text-xl font-bold tracking-tight text-gray-900">
                {item?.name}
              </h1>

              <ItemPropertiesComponent
                item={item}
                groups={groups}
                description={item?.description}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default ItemDetailComponent
