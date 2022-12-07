import ProgressBarComponent from 'core/components/ui/progress-bar.comp'
import { CatalogueItem } from 'core/types/responses'

import ItemPropertiesComponent from './default-properties/item-properties.comp'
import ImageGalleryComponent from './gallery/image-gallery.comp'
import ItemDetailHeaderComponent from './header/item-detail-header.comp'

interface Props {
  images: { name: string; id: number; src: string }[]
  item: CatalogueItem | undefined
  groups: string[]
}

const ItemDetailComponent = ({ item, images, groups }: Props) => {
  return (
    <div className="bg-white pb-10">
      <ItemDetailHeaderComponent />
      {item ? (
        <main className="mx-auto max-w-7xl sm:px-6 sm:pt-16 lg:px-8">
          <div className="mx-auto max-w-2xl lg:max-w-none">
            <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
              <ImageGalleryComponent images={images} />

              <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
                <h1 className="text-3xl font-bold tracking-tight text-gray-900">{item.name}</h1>
                <div className="mt-6">
                  <h3 className="sr-only">Description</h3>
                  <div
                    className="space-y-6 text-base text-gray-700"
                    dangerouslySetInnerHTML={{
                      __html: item.description === '' || item.description === null ? 'No description' : item.description
                    }}
                  />
                </div>
                <ItemPropertiesComponent item={item} groups={groups} />
              </div>
            </div>
          </div>
        </main>
      ) : (
        <ProgressBarComponent />
      )}
    </div>
  )
}

export default ItemDetailComponent
