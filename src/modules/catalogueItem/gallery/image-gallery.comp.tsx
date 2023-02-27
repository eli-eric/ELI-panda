import { Tab } from '@headlessui/react'
import Image from 'next/image'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

interface Props {
  images: { name: string; id: number; src: string }[]
}

const ImageGalleryComponent = ({ images }: Props) => {
  return (
    <Tab.Group as="div" className="flex flex-col-reverse">
      {/* Image selector */}
      <div className="mx-auto hidden w-full max-w-2xl sm:block lg:max-w-none">
        <Tab.List className="grid grid-cols-4 gap-6 pb-1">
          {images.map(image => (
            <Tab
              key={image.id}
              className="relative flex h-24 cursor-pointer items-center justify-center rounded-md bg-white text-sm font-medium uppercase "
            >
              {({ selected }) => (
                <>
                  <span className="sr-only"> {image.name} </span>
                  <span className="absolute inset-0 overflow-hidden rounded-md">
                    <Image
                      src={image.src}
                      alt=""
                      className="h-full w-full object-cover object-center"
                      width={1000}
                      height={1000}
                    />
                  </span>
                  <span
                    className={classNames(
                      selected ? 'ring-primary-500' : 'ring-transparent',
                      'pointer-events-none absolute inset-0 rounded-md ring-2 ring-offset-2',
                    )}
                    aria-hidden="true"
                  />
                </>
              )}
            </Tab>
          ))}
        </Tab.List>
      </div>

      <Tab.Panels className="aspect-w-1 aspect-h-1 w-full">
        {images.map(image => (
          <Tab.Panel key={image.id}>
            <Image
              src={image.src}
              alt="catalogue/item/image"
              className="w-full object-cover object-center sm:rounded-lg"
              width={500}
              height={500}
            />
          </Tab.Panel>
        ))}
      </Tab.Panels>
    </Tab.Group>
  )
}

export default ImageGalleryComponent
