import { ImageIcon, Upload } from 'lucide-react'
import { useIntl } from 'react-intl'

import { Button } from '@/components/ui/button'
import { message } from '@/i18n/src/messages'
import { cn } from '@/lib/utils'

interface ImageUploadZoneProps {
  isDragActive: boolean
  hasEditRole?: boolean
  hasImages?: boolean
  onUploadClick?: () => void
}

/**
 * Upload zone component for drag & drop and click-to-upload
 *
 * Shows different UI based on whether images exist:
 * - Empty state: Large dropzone with instructions
 * - With images: Compact button in toolbar
 *
 * Note: Parent component manages the input element and dropzone props
 */
export const ImageUploadZone = ({
  isDragActive,
  hasEditRole = false,
  hasImages = false,
  onUploadClick
}: ImageUploadZoneProps) => {
  const { formatMessage: fm } = useIntl()

  if (!hasEditRole) return null

  // Compact button mode (when images exist)
  if (hasImages) {
    return (
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={onUploadClick}
        className="h-6 text-xs px-2"
      >
        <Upload className="h-3 w-3 mr-1" />
        {fm({ id: message.common.imageGallery.upload })}
      </Button>
    )
  }

  // Empty state mode (no images yet)
  return (
    <div
      onClick={onUploadClick}
      className={cn(
        'flex flex-col items-center justify-center py-4 px-3 text-center border-2 border-dashed rounded-sm transition-colors',
        hasEditRole
          ? 'cursor-pointer hover:border-primary/50 hover:bg-primary/5'
          : 'cursor-default bg-muted/20',
        isDragActive && 'border-primary bg-primary/5'
      )}
    >
      <ImageIcon className="h-5 w-5 text-muted-foreground mb-1" />
      <div className="space-y-0.5">
        <p className="text-xs font-medium text-foreground">
          {fm({ id: message.common.imageGallery.uploadAnImage })}
        </p>
        <p className="text-xs text-muted-foreground opacity-75">
          {fm({ id: message.common.imageGallery.pngJpgInfo })}
        </p>
      </div>
      {/* No input element here - it's in parent component */}
    </div>
  )
}
