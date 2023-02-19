import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import useSWR from 'swr'

import { useEndpoint } from '@/hooks/useEndpoint'
import { CatalogueItem } from '@/types/responses'

import ItemPropertiesComponent from './default-properties/item-properties.comp'
import ImageGalleryComponent from './gallery/image-gallery.comp'

interface Props {
  images: { name: string; id: number; src: string }[]
}

const ItemDetailComponent = ({ images }: Props) => {
  const router = useRouter()
  const [groups, setGroups] = useState<Array<string>>([])
  const { catalogueItem } = useEndpoint({ uid: router.query.uid as string })
  const { data: item } = useSWR<CatalogueItem>(router.query.uid && catalogueItem)

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
    <div className="bg-white pb-10">
      <main className="mx-auto max-w-7xl sm:px-6 sm:pt-16 lg:px-8 h-full overflow-auto">
        <div className="mx-auto max-w-2xl lg:max-w-none">
          <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
            <ImageGalleryComponent images={images} />

            <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
              <h1 className="text-3xl font-bold tracking-tight text-gray-900">{item?.name}</h1>
              <div className="mt-6">
                <h3 className="sr-only">Description</h3>
                <div className="space-y-6 text-base text-gray-700">{item?.description ?? 'No description'}</div>
              </div>
              <ItemPropertiesComponent item={item} groups={groups} />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default ItemDetailComponent
