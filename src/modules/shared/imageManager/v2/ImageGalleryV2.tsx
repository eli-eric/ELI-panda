import { AlertCircle } from 'lucide-react'
import { Fragment, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { useIntl } from 'react-intl'

import { message } from '@/i18n/src/messages'
import { cn } from '@/lib/utils'

import { ImageActions } from './components/ImageActions'
import { ImageCarousel } from './components/ImageCarousel'
import { ImageUploadZone } from './components/ImageUploadZone'
import { useImageDelete, useImages, useImageUpload } from './hooks'
import type { ImageHookParams, ImageItem } from './types'

interface ImageGalleryV2Props extends ImageHookParams {
  hasEditRole?: boolean
  className?: string
  allowMultipleImages?: boolean
  disabled?: boolean
}

/**
 * ImageGalleryV2 - Modern image gallery with immediate upload
 *
 * Key improvements over V1:
 * - ✅ No refs - Pure props-based interface
 * - ✅ No form coupling - Independent module
 * - ✅ Immediate upload - Upload on drop, instant feedback
 * - ✅ No duplicates - Server is source of truth
 * - ✅ Simple architecture - React Query handles all state
 *
 * @param itemType - Type of item (e.g., FILE_TYPE.CATALOGUE)
 * @param itemId - UUID of the item (required for operations)
 * @param hasEditRole - Whether user can upload/delete
 * @param allowMultipleImages - Allow multiple images (default: true)
 * @param disabled - Disable all actions
 * @param className - Additional CSS classes
 *
 * @example
 * ```tsx
 * <ImageGalleryV2
 *   itemType={FILE_TYPE.CATALOGUE}
 *   itemId="123-456-789"
 *   hasEditRole={!disabledEdit}
 * />
 * ```
 */
export const ImageGalleryV2 = ({
  itemType,
  itemId,
  hasEditRole = false,
  className,
  allowMultipleImages = true,
  disabled = false
}: ImageGalleryV2Props) => {
  const { formatMessage: fm } = useIntl()
  const [selectedImage, setSelectedImage] = useState<ImageItem | undefined>()

  // Hooks for data fetching and mutations
  const { data: images = [], isLoading } = useImages({ itemType, itemId })
  const { mutate: uploadImage, isPending: isUploading } = useImageUpload({
    itemType,
    itemId
  })
  const { mutate: deleteImage, isPending: isDeleting } = useImageDelete({
    itemType,
    itemId
  })

  // Dropzone for drag & drop - disabled when no itemId
  const { open, getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'image/*': []
    },
    disabled: !itemId || !hasEditRole || disabled,
    onDrop: (files: File[]) => {
      files.forEach(file => uploadImage({ file }))
    },
    noClick: true, // Prevent click on root element, only button clicks
    noKeyboard: true // Prevent keyboard events on root
  })

  // Track current image from carousel
  const handleImageSelect = (image: ImageItem) => {
    setSelectedImage(image)
  }

  // Set first image as selected on mount
  const currentImage = selectedImage || images[0]

  const isProcessing = isUploading || isDeleting

  // Show info message when item hasn't been saved yet (no itemId)
  if (!itemId) {
    return (
      <div
        className={cn(
          'w-full max-w-full border rounded-md overflow-hidden',
          className
        )}
      >
        <div className="aspect-[3/2] bg-muted/30 flex items-center justify-center p-4">
          <div className="flex flex-col items-center text-center gap-2">
            <AlertCircle className="h-8 w-8 text-muted-foreground/50" />
            <p className="text-sm text-muted-foreground">
              {fm({ id: message.common.imageGallery.saveItemToUploadImages })}
            </p>
          </div>
        </div>
      </div>
    )
  }

  // Show placeholder while loading
  if (isLoading) {
    return (
      <div
        className={cn(
          'w-full max-w-full border rounded-md overflow-hidden',
          className
        )}
      >
        <div className="aspect-[3/2] bg-muted animate-pulse flex items-center justify-center">
          <p className="text-sm text-muted-foreground">
            {fm({ id: message.common.imageGallery.loading })}
          </p>
        </div>
      </div>
    )
  }

  return (
    <Fragment>
      {/* Hidden input for file selection - SINGLE instance */}
      <input {...getInputProps()} style={{ display: 'none' }} />

      <div
        {...getRootProps()}
        className={cn(
          'w-full max-w-full border rounded-md overflow-hidden transition-colors',
          isDragActive && 'border-primary bg-primary/5',
          !hasEditRole && 'cursor-default',
          className
        )}
      >
        {images.length > 0 ? (
          <div>
            {/* Action buttons toolbar */}
            <div className="flex items-center justify-between px-2 py-1 bg-background/95 border-b">
              <div className="flex items-center gap-1">
                <ImageUploadZone
                  isDragActive={isDragActive}
                  hasEditRole={hasEditRole}
                  hasImages={true}
                  onUploadClick={open}
                />

                <ImageActions
                  currentImage={currentImage}
                  hasEditRole={hasEditRole}
                  disabled={disabled || isProcessing}
                  onDelete={(imageId, imageName) =>
                    deleteImage({ imageId, imageName })
                  }
                />
              </div>

              {/* Upload/Delete status */}
              {isProcessing && (
                <div className="text-xs text-muted-foreground">
                  {isUploading && fm({ id: message.common.imageGallery.uploading })}
                  {isDeleting && fm({ id: message.common.imageGallery.deleting })}
                </div>
              )}
            </div>

            {/* Image carousel */}
            <ImageCarousel
              images={images}
              allowMultiple={allowMultipleImages}
              onImageSelect={handleImageSelect}
            />
          </div>
        ) : (
          /* Empty state */
          <ImageUploadZone
            isDragActive={isDragActive}
            hasEditRole={hasEditRole}
            hasImages={false}
            onUploadClick={open}
          />
        )}
      </div>
    </Fragment>
  )
}

ImageGalleryV2.displayName = 'ImageGalleryV2'
