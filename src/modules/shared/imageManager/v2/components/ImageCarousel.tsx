import Image from 'next/image'
import { useEffect, useState } from 'react'

import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/components/ui/carousel'
import { cn } from '@/lib/utils'

import type { ImageItem } from '../types'

interface ImageCarouselProps {
  images: ImageItem[]
  allowMultiple?: boolean
  onImageSelect?: (image: ImageItem, index: number) => void
}

/**
 * Carousel component for displaying images
 *
 * Features:
 * - shadcn/ui Carousel with navigation
 * - Thumbnail navigation strip
 * - Image counter
 * - Click to select image
 */
export const ImageCarousel = ({
  images,
  allowMultiple = true,
  onImageSelect
}: ImageCarouselProps) => {
  const [api, setApi] = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!api) return

    setCount(api.scrollSnapList().length)
    setCurrent(api.selectedScrollSnap() + 1)

    api.on('select', () => {
      const selected = api.selectedScrollSnap()
      setCurrent(selected + 1)

      if (onImageSelect && images[selected]) {
        onImageSelect(images[selected], selected)
      }
    })
  }, [api, images, onImageSelect])

  if (!images || images.length === 0) {
    return null
  }

  return (
    <div>
      {/* Main carousel */}
      <div className="relative px-6">
        <Carousel
          setApi={setApi}
          className="w-full"
          opts={{
            align: 'start',
            loop: allowMultiple
          }}
        >
          <CarouselContent className="max-w-full">
            {images.map(image => (
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
          {allowMultiple && images.length > 1 && (
            <>
              <CarouselPrevious className="left-1 size-6" />
              <CarouselNext className="right-1 size-6" />
            </>
          )}
        </Carousel>
      </div>

      {/* Thumbnails navigation */}
      {allowMultiple && images.length > 1 && (
        <div className="flex items-center justify-center gap-1 px-2 py-1 border-t bg-muted/30">
          {images.map((image, index) => (
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

      {/* Image counter */}
      {allowMultiple && images.length > 1 && (
        <div className="absolute top-2 right-2 text-xs text-muted-foreground font-medium bg-background/80 px-2 py-0.5 rounded">
          {current}/{count}
        </div>
      )}
    </div>
  )
}
