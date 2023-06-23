import { Tab } from '@headlessui/react'
import { forwardRef, Fragment, useImperativeHandle } from 'react'
import { useDropzone } from 'react-dropzone'
import type { FileItem } from 'src/modules/shared/fileManager/types'
import useSWR from 'swr'

import { classNames } from '@/helpers'
import { uniFetcher } from '@/helpers/fetcher'
import useWarningModal from '@/hooks/useWarningModal'

import { ImagePlaceHolder } from './components/ImagePlaceHolder'
import { ImageTabList } from './components/ImageTabList'
import { ImageTabPanels } from './components/ImageTabPanels'
import type { Config } from './types'
import { getEndpoint } from './utils'
import { useImageGallery } from './utils/useImageGallery'

type GalleryProps = {
  config: Config
  hasEditRole?: boolean
  className?: string
}

export const ImageGallery = forwardRef(
  ({ hasEditRole, className, config: { itemCategory, itemId, fileCategory = 'image' } }: GalleryProps, ref) => {
    const endpoint = getEndpoint(itemCategory, itemId, fileCategory)

    const { data, isLoading } = useSWR<FileItem[]>(endpoint, uniFetcher, {
      suspense: false,
      revalidateOnMount: true
    })

    const { submit, onDrop, hasChanges, handleDelete } = useImageGallery({ itemCategory, itemId, fileCategory })

    useImperativeHandle(
      ref,
      () => ({
        submit,
        hasChanges
      }),
      [submit, hasChanges]
    )

    const withWarnModal = useWarningModal()

    const { open, getRootProps, getInputProps, isDragActive } = useDropzone({
      accept: {
        'image/*': []
      },
      disabled: !hasEditRole,
      onDrop,
      noClick: true
    })

    return (
      <Fragment>
        {isLoading ? (
          <ImagePlaceHolder className={className} />
        ) : (
          <div
            {...getRootProps()}
            className={classNames('flex flex-col rounded-md', isDragActive && 'border-2 border-orange-600', className)}
          >
            <Tab.Group key={JSON.stringify(data)}>
              {({ selectedIndex }) => (
                <Fragment>
                  <ImageTabList
                    data={data}
                    canEdit={hasEditRole}
                    open={open}
                    getInputProps={getInputProps}
                    handleDelete={handleDelete}
                    withWarnModal={withWarnModal}
                    selectedIndex={selectedIndex}
                  />
                  <ImageTabPanels data={data} getRootProps={getRootProps} />
                </Fragment>
              )}
            </Tab.Group>
          </div>
        )}
      </Fragment>
    )
  }
)

ImageGallery.displayName = 'ImageGallery'
