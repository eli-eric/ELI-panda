import { Tab } from '@headlessui/react'
import Image from 'next/image'
import { useState } from 'react'
import { useDropzone } from 'react-dropzone'
import useWarningModal from 'src/hooks/useWarningModal'
import type { FileItem } from 'src/modules/shared/fileManager/types'

import { CancelButton, DeleteButton, PlusButton } from '@/components/Buttons'
import { classNames } from '@/helpers'

const fallbackImage = {
  id: 'fallback',
  name: 'fallback image',
  url: '/no-image.png',
  type: 'fallback'
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
  const { handleDelete, onDrop, discard, hasEditRole, hasChanges = false, data = [], width = 400, height = 400 } = props

  const withWarningModal = useWarningModal()

  const canEdit = hasEditRole && handleDelete && onDrop && discard

  const { open, getRootProps, isDragActive } = useDropzone({
    accept: {
      'image/*': []
    },
    disabled: !canEdit,
    onDrop,
    noClick: true
  })

  const [selectedIndex, setSelectedIndex] = useState(0)

  return (
    <div
      {...getRootProps()}
      className={classNames('flex flex-col rounded-md', isDragActive && 'border-2 border-orange-600', props.className)}
    >
      <Tab.Group
        key={JSON.stringify(data)}
        onChange={index => {
          setSelectedIndex(index)
        }}
      >
        <Tab.List className={`rounded-t-md border border-gray-300 flex gap-1 justify-between`}>
          {canEdit && (
            <div className="flex">
              <PlusButton
                type="button"
                onClick={open}
                className="h-full flex border-0 border-r rounded-none rounded-tl-md"
              />
              <DeleteButton
                type="button"
                onClick={() => {
                  console.log('delete')
                  const obj = data[selectedIndex]
                  if (obj && obj.id !== 'fallback') {
                    withWarningModal(handleDelete, 'Are you sure to delete this image?')(obj)
                  }
                }}
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
              <CancelButton
                type="button"
                onClick={() => withWarningModal(discard, 'Are you sure to discard your changes?')()}
                className="flex border-0 border-l rounded-none rounded-tr-md"
                disabled={!hasChanges}
              />
            </div>
          )}
        </Tab.List>

        <Tab.Panels
          {...getRootProps()}
          className="flex rounded-b-md border border-t-0 border-gray-300"
          style={{ height: 'calc(100% - 30px)' }}
        >
          {(data && data.length > 0 ? data : [fallbackImage]).map(obj => (
            <Tab.Panel key={obj.id} className="relative flex">
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
      </Tab.Group>
    </div>
  )
}

export default ImageGallery
