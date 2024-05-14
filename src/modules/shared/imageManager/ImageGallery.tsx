import { Tab } from '@headlessui/react'
import {
  forwardRef,
  Fragment,
  useEffect,
  useImperativeHandle,
  useMemo
} from 'react'
import { useDropzone } from 'react-dropzone'
import type { UseFormSetValue } from 'react-hook-form'
import type { FileItem } from 'src/modules/shared/fileManager/types'

import useWarningModal from '@/hooks/useWarningModal'
import { classNames } from '@/utils'
import { uniFetcher } from '@/utils/fetcher'

import { ImagePlaceHolder } from './components/ImagePlaceHolder'
import { ImageTabList } from './components/ImageTabList'
import { ImageTabPanels } from './components/ImageTabPanels'
import type { Config } from './types'
import { getEndpoint } from './utils'
import { useImageGallery } from './utils/useImageGallery'
import { useQuery } from '@tanstack/react-query'

type GalleryProps = {
  config: Config
  hasEditRole?: boolean
  className?: string
  setValue?: UseFormSetValue<any>
}

export const ImageGallery = forwardRef(
  (
    {
      hasEditRole,
      className,
      setValue,
      config: { itemCategory, itemId, fileCategory = 'image', additionalParams }
    }: GalleryProps,
    ref
  ) => {
    const endpoint = getEndpoint(itemCategory, itemId, fileCategory)

    const additionalEndpoint = getEndpoint(
      additionalParams?.itemCategory,
      additionalParams?.itemId,
      fileCategory
    )

    const {
      data: primaryData,
      isLoading,
      refetch
    } = useQuery<FileItem[]>({
      queryKey: ['fileItem', endpoint],
      queryFn: async () => uniFetcher(endpoint),
      refetchOnMount: true
    })

    const { data: additionalData, isLoading: isLoadingAdditionalData } =
      useQuery<FileItem[]>({
        queryKey: ['fileItem', additionalEndpoint],
        queryFn: async () => uniFetcher(additionalEndpoint),
        refetchOnMount: true,
        enabled: !!additionalParams?.itemId
      })

    const data = useMemo(() => {
      if (primaryData && additionalData) {
        return [...additionalData, ...primaryData]
      } else if (primaryData) {
        return primaryData
      } else if (additionalData) {
        return additionalData
      }
      return []
    }, [primaryData, additionalData])

    const { submit, onDrop, hasChanges, handleDelete } = useImageGallery({
      itemCategory,
      itemId,
      fileCategory,
      refetch
    })

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

    useEffect(() => {
      setValue &&
        setValue('hasImageGalleryChanges', hasChanges, {
          shouldDirty: hasChanges
        })
    }, [hasChanges, setValue])

    return (
      <Fragment>
        {isLoading || isLoadingAdditionalData ? (
          <ImagePlaceHolder className={className} />
        ) : (
          <div
            {...getRootProps()}
            className={classNames(
              'flex flex-col rounded-md',
              isDragActive && 'border-2 border-orange-600 sm:max-h-14',
              className
            )}
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
