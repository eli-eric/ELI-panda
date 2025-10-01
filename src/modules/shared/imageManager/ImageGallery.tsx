import { useQuery } from '@tanstack/react-query'
import { ImageIcon, Trash2, Upload } from 'lucide-react'
import Image from 'next/image'
import {
  forwardRef,
  Fragment,
  useEffect,
  useImperativeHandle,
  useMemo,
  useState
} from 'react'
import { useDropzone } from 'react-dropzone'
import type { UseFormSetValue } from 'react-hook-form'
import type { FileItem } from 'src/modules/shared/fileManager/types'

import { Button } from '@/components/ui/button'
import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/components/ui/carousel'
import useWarningModal from '@/hooks/useWarningModal'
import { cn } from '@/lib/utils'
import { uniFetcher } from '@/utils/fetcher'

import { ImagePlaceHolder } from './components/ImagePlaceHolder'
import type { Config } from './types'
import { getEndpoint } from './utils'
import { useImageGallery } from './utils/useImageGallery'

type GalleryProps = {
  config: Config
  hasEditRole?: boolean
  className?: string
  setValue?: UseFormSetValue<any>
  allowMultipleImages?: boolean
  disabled?: boolean
}

export const ImageGallery = forwardRef(
  (
    {
      hasEditRole,
      className,
      setValue,
      disabled,
      allowMultipleImages = true,
      config: { itemCategory, itemId, fileCategory = 'image', additionalParams }
    }: GalleryProps,
    ref
  ) => {
    const [api, setApi] = useState<CarouselApi>()
    const [current, setCurrent] = useState(0)
    const [count, setCount] = useState(0)

    const endpoint = getEndpoint(itemCategory, itemId, fileCategory)

    const additionalEndpoint = getEndpoint(
      additionalParams?.itemCategory,
      additionalParams?.itemId,
      fileCategory
    )

    const { data: primaryData, isLoading } = useQuery<FileItem[]>({
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
      fileCategory
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

    useEffect(() => {
      if (!api) return

      setCount(api.scrollSnapList().length)
      setCurrent(api.selectedScrollSnap() + 1)

      api.on('select', () => {
        setCurrent(api.selectedScrollSnap() + 1)
      })
    }, [api])

    const currentImage = data?.[current - 1]

    return (
      <Fragment>
        {isLoading || isLoadingAdditionalData ? (
          <ImagePlaceHolder className={className} />
        ) : (
          <div
            {...getRootProps()}
            className={cn(
              'w-full max-w-full border rounded-md overflow-hidden transition-colors',
              isDragActive && 'border-primary bg-primary/5',
              !hasEditRole && 'cursor-default',
              className
            )}
          >
            {data?.length ? (
              <div>
                {/* Action buttons - positioned at top */}
                <div className="flex items-center justify-between px-2 py-1 bg-background/95 border-b">
                  <div className="flex items-center gap-1">
                    {hasEditRole && (
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={open}
                        disabled={disabled}
                        className="h-6 text-xs px-2"
                      >
                        <Upload className="h-3 w-3 mr-1" />
                        Upload
                      </Button>
                    )}

                    {hasEditRole && currentImage && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() =>
                          withWarnModal(
                            handleDelete,
                            `Are you sure you want to delete ${currentImage.name}?`
                          )(currentImage)
                        }
                        disabled={disabled || !data || data.length === 0}
                        className="h-6 text-xs px-2 text-destructive hover:text-destructive hover:bg-destructive/20"
                      >
                        <Trash2 className="h-3 w-3 mr-1" />
                        Delete
                      </Button>
                    )}
                  </div>

                  {/* Image counter */}
                  {allowMultipleImages && data.length > 1 && (
                    <div className="text-xs text-muted-foreground font-medium">
                      {current}/{count}
                    </div>
                  )}
                </div>

                {/* Main carousel */}
                <div className="relative px-6">
                  <Carousel
                    setApi={setApi}
                    className="w-full"
                    opts={{
                      align: 'start',
                      loop: allowMultipleImages
                    }}
                  >
                    <CarouselContent className="max-w-full">
                      {data.map(image => (
                        <CarouselItem key={image.id} className="max-w-full">
                          <div className="relative aspect-[3/2] bg-muted rounded-sm overflow-hidden max-w-full">
                            <Image
                              src={image.url}
                              alt={image.name}
                              fill
                              unoptimized
                              className="object-contain"
                              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            />
                          </div>
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                    {allowMultipleImages && data.length > 1 && (
                      <>
                        <CarouselPrevious className="left-1 size-6" />
                        <CarouselNext className="right-1 size-6" />
                      </>
                    )}
                  </Carousel>
                </div>

                {/* Mini thumbnails navigation */}
                {allowMultipleImages && data.length > 1 && (
                  <div className="flex items-center justify-center gap-1 px-2 py-1 border-t bg-muted/30">
                    {data.map((image, index) => (
                      <button
                        key={image.id}
                        type="button"
                        onClick={() => api?.scrollTo(index)}
                        className={cn(
                          'relative size-6 rounded-sm overflow-hidden border transition-all',
                          current === index + 1
                            ? 'border-primary ring-1 ring-primary/20'
                            : 'border-muted-foreground/20 hover:border-muted-foreground/50'
                        )}
                      >
                        <Image
                          src={image.url}
                          alt={image.name}
                          unoptimized
                          fill
                          className="object-cover"
                          sizes="24px"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              /* Empty state */
              <div
                className={cn(
                  'flex flex-col items-center justify-center py-4 px-3 text-center border-2 border-dashed rounded-sm transition-colors',
                  hasEditRole
                    ? 'cursor-pointer hover:border-primary/50 hover:bg-primary/5'
                    : 'cursor-default bg-muted/20',
                  isDragActive && 'border-primary bg-primary/5'
                )}
                onClick={hasEditRole ? open : undefined}
              >
                <ImageIcon className="h-5 w-5 text-muted-foreground mb-1" />
                <div className="space-y-0.5">
                  <p className="text-xs font-medium text-foreground">
                    {hasEditRole ? 'Upload an image' : 'No images available'}
                  </p>
                  {hasEditRole && (
                    <p className="text-xs text-muted-foreground opacity-75">
                      PNG, JPG up to 10MB
                    </p>
                  )}
                </div>
              </div>
            )}
            <input {...getInputProps()} />
          </div>
        )}
      </Fragment>
    )
  }
)

ImageGallery.displayName = 'ImageGallery'
