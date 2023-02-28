import ImageGalleryComponent from '@/components/item-detail/ImageGallery'

import ItemPropertyTitle from '../item-property/item-property-title.comp'
import ItemPropertyValue from '../item-property/item-property-value.comp'

interface Props {
  title: string
  images: string[]
  decription: string
  children: React.ReactNode
}

const ItemDetailComponent = ({
  title,
  images,
  decription,
  children,
}: Props) => (
  <div className="bg-white pb-10">
    <main className="mx-auto max-w-7xl sm:px-6 sm:pt-16 lg:px-8 h-full overflow-auto">
      <div className="mx-auto max-w-2xl lg:max-w-none">
        <div className="lg:grid lg:grid-cols-3 lg:items-start lg:gap-x-8 pb-3">
          <ImageGalleryComponent images={images} />

          <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0 col-span-2">
            <h1 className="text-xl font-bold tracking-tight text-gray-900">
              {title}
            </h1>

            <section aria-labelledby="details-heading">
              <div className="px-4 py-5 sm:px-6">
                <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
                  {children}
                </dl>
              </div>
            </section>
          </div>
        </div>
        <ItemPropertyTitle title="Description">
          <ItemPropertyValue text={decription} />
        </ItemPropertyTitle>
      </div>
    </main>
  </div>
)

export default ItemDetailComponent
