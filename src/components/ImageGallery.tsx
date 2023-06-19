import { Tab } from '@headlessui/react'
import Image from 'next/image'
import { useDropzone } from 'react-dropzone'
import type { FileItem } from 'src/modules/shared/fileManager/types'

import { DeleteButton, PlusButton } from '@/components/Buttons'
import { classNames } from '@/helpers'

const fallbackImage = {
  id: 'fallback',
  name: 'fallback image',
  url: '/no-image.png'
}

type GalleryProps = {
  data: FileItem[] | undefined
  handleDelete?: (arg0: FileItem) => void
  onDrop?: (arg0: File[]) => void
  hasEditRole?: boolean
  width?: number
  height?: number
  discard?: () => void
  hasChanges?: boolean
  className?: string
}

const ImageGallery = (props: GalleryProps) => {
  const { handleDelete, onDrop, discard, hasEditRole, data = [], width = 400, height = 400 } = props

  const canEdit = hasEditRole && handleDelete && onDrop

  const { open, getRootProps, isDragActive } = useDropzone({
    accept: {
      'image/*': []
    },
    disabled: !canEdit,
    onDrop,
    noClick: true
  })

  return (
    <div
      {...getRootProps()}
      className={classNames('flex flex-col rounded-md', isDragActive && 'border-2 border-orange-600', props.className)}
    >
      <Tab.Group key={JSON.stringify(data)}>
        {({ selectedIndex }) => (
          <>
            <Tab.List className={`rounded-t-md border border-gray-300 flex gap-1 justify-between`}>
              {canEdit && (
                <div>
                  <PlusButton
                    type="button"
                    onClick={open}
                    className="h-full flex border-0 border-r rounded-none rounded-tl-md"
                  />
                </div>
              )}

              <div className="flex flex-wrap w-full justify-center">
                {data?.map(obj => (
                  <Tab key={obj.id}>
                    {({ selected }) => <span className={`px-1 ${selected && 'text-orange-600'} text-sm`}>&bull;</span>}
                  </Tab>
                ))}
              </div>

              {canEdit && (
                <div>
                  <DeleteButton
                    type="button"
                    onClick={() => handleDelete(data[selectedIndex])}
                    className="flex border-0 border-l rounded-none rounded-tr-md"
                    disabled={!data || data.length === 0}
                  />
                </div>
              )}
            </Tab.List>

            <Tab.Panels {...getRootProps()} className="h-full flex rounded-b-md border border-t-0 border-gray-300">
              {(data && data.length > 0 ? data : [fallbackImage]).map(obj => (
                <Tab.Panel key={obj.id} className="flex">
                  <Image
                    width={width}
                    height={height}
                    className="object-contain rounded-b-md"
                    src={obj.url}
                    alt={obj.name}
                    unoptimized
                  />
                </Tab.Panel>
              ))}
            </Tab.Panels>
          </>
        )}
      </Tab.Group>
    </div>
  )
}

export default ImageGallery
