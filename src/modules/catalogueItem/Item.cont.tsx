import { useEffect, useState } from 'react'

import ItemPropertyTitle from '@/components/item-property/item-property-title.comp'
import ItemPropertyValue from '@/components/item-property/item-property-value.comp'
import { message } from '@/i18n/src/messages'

import ImageGalleryComponent from '../../components/item-detail/ImageGallery'
import ItemPropertiesComponent from './default-properties/item-properties.comp'
import useItem from './hooks/useItem'

const messages = message.cataloguePage.itemList.header

const ItemContainer = () => {
  const [groups, setGroups] = useState<Array<string>>([])
  const { item, image } = useItem()

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
          <div className="lg:grid lg:grid-cols-3 lg:items-start lg:gap-x-8 pb-3">
            <ImageGalleryComponent images={[image]} />
            <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0 col-span-2">
              <h1 className="text-xl font-bold tracking-tight text-gray-900">{item?.name}</h1>
              <ItemPropertiesComponent item={item} groups={groups} description={item?.description} />
            </div>
          </div>
          <ItemPropertyTitle title={messages.description} span="2">
            <ItemPropertyValue text={item?.description} />
          </ItemPropertyTitle>
        </div>
      </main>
    </div>
  )
}

export default ItemContainer
