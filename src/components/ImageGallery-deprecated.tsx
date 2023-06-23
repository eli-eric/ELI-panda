import { Tab } from '@headlessui/react'
import Image from 'next/image'
import { Fragment } from 'react'
import { useDropzone } from 'react-dropzone'
import type { FileItem } from 'src/modules/shared/fileManager/types'
import useSWR from 'swr'

import { DeleteButton, PlusButton } from '@/components/Buttons'
import { classNames } from '@/helpers'
import { uniFetcher } from '@/helpers/fetcher'
import useWarningModal from '@/hooks/useWarningModal'

const fallbackImage: FileItem = {
  id: 'fallback',
  name: 'fallback image',
  url: '/no-image.png'
}

type GalleryProps = {
  endpoint: string
  handleDelete?: (arg0: FileItem) => void
  onDrop?: (arg0: File[]) => void
  hasEditRole?: boolean
  width?: number
  height?: number
  discard?: () => void
  hasChanges?: boolean
  className?: string
  suspense?: boolean
}

const ImageGallery = (props: GalleryProps) => {
  const { suspense, handleDelete, onDrop, hasEditRole, endpoint, width = 400, height = 400 } = props

  const { data, isLoading } = useSWR<FileItem[]>(endpoint, uniFetcher, { suspense })

  const withWarnModal = useWarningModal()

  const canEdit = hasEditRole && handleDelete && onDrop

  const { open, getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'image/*': []
    },
    disabled: !canEdit,
    onDrop,
    noClick: true
  })

  return (
    <Fragment>
      {isLoading ? (
        /* pulsing placeholder */
        <div className={classNames('flex flex-col rounded-md', props.className)}>
          <div className="flex rounded-md border border-t-0 border-gray-200">
            <div className="w-full h-[270px] bg-gray-100 animate-pulse" />
          </div>
        </div>
      ) : (
        <div
          {...getRootProps()}
          className={classNames(
            'flex flex-col rounded-md',
            isDragActive && 'border-2 border-orange-600',
            props.className
          )}
        >
          <Tab.Group key={JSON.stringify(data)}>
            {({ selectedIndex }) => (
              <>
                <Tab.List className={`rounded-t-md border border-gray-300 flex gap-1 justify-between`}>
                  {canEdit && (
                    <div>
                      <input {...getInputProps()} />
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
                        {({ selected }) => (
                          <span className={`px-1 ${selected && 'text-orange-600'} text-sm`}>&bull;</span>
                        )}
                      </Tab>
                    ))}
                  </div>

                  {canEdit && (
                    <div>
                      <DeleteButton
                        type="button"
                        onClick={() =>
                          withWarnModal(
                            handleDelete,
                            `Are you sure you want to delete ${(data ?? [])[selectedIndex]?.name}?`
                          )((data ?? [])[selectedIndex])
                        }
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
      )}
    </Fragment>
  )
}

export default ImageGallery
