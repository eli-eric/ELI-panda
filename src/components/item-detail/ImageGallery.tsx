import { Tab } from '@headlessui/react'
import { PhotoIcon } from '@heroicons/react/24/outline'
import Image, { type StaticImageData } from 'next/image'

interface Props {
  images: Array<string | StaticImageData>
}

const ImageGalleryComponent = ({ images }: Props) => (
  <Tab.Group as="div" className="flex flex-col-reverse">
    {/* Image selector */}
    <div className="mx-auto hidden w-full max-w-2xl sm:block lg:max-w-none">
      {/* <Tab.List className="grid grid-cols-4 gap-6 pb-1">
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
                    'pointer-events-none absolute inset-0 rounded-md ring-2 ring-offset-2',
                    selected ? 'ring-primary-500' : 'ring-transparent'
                  )}
                  aria-hidden="true"
                />
              </>
            )}
          </Tab>
        ))}
      </Tab.List> */}
    </div>

    <Tab.Panels className="w-full">
      {images.map((image, index) => (
        <Tab.Panel key={index}>
          {image ? (
            <Image
              src={image}
              alt=""
              className="w-full h-72 object-cover object-center sm:rounded-lg"
              width={400}
              height={400}
            />
          ) : (
            <div className="w-52 h-52">
              <PhotoIcon></PhotoIcon>
            </div>
          )}
        </Tab.Panel>
      ))}
    </Tab.Panels>
  </Tab.Group>
)

export default ImageGalleryComponent
