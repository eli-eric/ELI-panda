import { CatalogueItem } from 'core/types/responses'

import DisclosureComponent from './disclosure/disclosure.comp'
import ImageGalleryComponent from './gallery/image-gallery.comp'

interface Props {
  images: { name: string; id: number; src: string }[]
  item: CatalogueItem | undefined
  groups: string[]
}

const ItemDetailComponent = ({ item, images, groups }: Props) => {
  return (
    <div className="bg-white pb-10">
      <main className="mx-auto max-w-7xl sm:px-6 sm:pt-16 lg:px-8">
        <div className="mx-auto max-w-2xl lg:max-w-none">
          {/* Product */}
          <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
            {/* Image gallery */}
            <ImageGalleryComponent images={images} />
            {/* Product info */}
            {item && (
              <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
                <h1 className="text-3xl font-bold tracking-tight text-gray-900">{item.name}</h1>

                <div className="mt-6">
                  <h3 className="sr-only">Description</h3>

                  <div
                    className="space-y-6 text-base text-gray-700"
                    dangerouslySetInnerHTML={{ __html: item.description }}
                  />
                </div>

                <section aria-labelledby="details-heading" className="mt-12">
                  <h2 id="details-heading" className="sr-only">
                    Additional details
                  </h2>

                  <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
                    <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
                      <div className="sm:col-span-1">
                        <dt className="text-sm font-medium text-gray-500">UID</dt>
                        <dd className="mt-1 text-sm text-gray-900">{item.uid}</dd>
                      </div>
                      <div className="sm:col-span-1">
                        <dt className="text-sm font-medium text-gray-500">Category Name</dt>
                        <dd className="mt-1 text-sm text-gray-900">{item.categoryName}</dd>
                      </div>
                      <div className="sm:col-span-1">
                        <dt className="text-sm font-medium text-gray-500">Manufacturer</dt>
                        <dd className="mt-1 text-sm text-gray-900">{item.manufacturer}</dd>
                      </div>
                      <div className="sm:col-span-1">
                        <dt className="text-sm font-medium text-gray-500">Manufacturer Number</dt>
                        <dd className="mt-1 text-sm text-gray-900">{item.manufacturerNumber}</dd>
                      </div>
                      <div className="sm:col-span-1">
                        <dt className="text-sm font-medium text-gray-500">Manufacturer Url</dt>
                        <dd className="mt-1 text-sm text-gray-900">{item.manufacturerUrl}</dd>
                      </div>
                    </dl>
                  </div>
                  <DisclosureComponent item={item} groups={groups} />
                </section>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}

export default ItemDetailComponent
