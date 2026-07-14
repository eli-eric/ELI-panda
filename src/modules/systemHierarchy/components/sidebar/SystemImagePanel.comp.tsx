import { ImageIcon, Loader2, Trash2, Upload } from 'lucide-react'
import Image from 'next/image'
import type { FC } from 'react'
import { useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { useIntl } from 'react-intl'

import { Button } from '@/components/ui/button'
import usePermission from '@/hooks/usePermission'
import useWarningModal from '@/hooks/useWarningModal'
import { message } from '@/i18n/src/messages'
import { cn } from '@/lib/utils'
import { FILE_TYPE } from '@/modules/shared/fileManager/types'
import { ImagePlaceHolder } from '@/modules/shared/imageManager/components/ImagePlaceHolder'
import { useImageAutoSave } from '@/modules/shared/imageManager/utils/useImageAutoSave'
import { useSystemEditPermission } from '@/modules/shared/system/edit-permission'
import { ROLE } from '@/types/constants/roles'

interface SystemImagePanelProps {
    systemUid: string
    systemName?: string | null
}

export const SystemImagePanel: FC<SystemImagePanelProps> = ({ systemUid, systemName }) => {
    const { formatMessage: fm } = useIntl()
    const { canEdit } = useSystemEditPermission(systemUid)
    const hasEditRole = !!usePermission([ROLE.SYSTEM_EDIT]) && canEdit
    const withWarnModal = useWarningModal()
    // track the selected image by id so reconcile reordering / deletes don't shift focus;
    // null falls back to index 0 (the newest, since uploads prepend)
    const [selectedId, setSelectedId] = useState<string | null>(null)

    const { images, isLoading, isMutating, uploadImages, deleteImage } = useImageAutoSave({
        itemCategory: FILE_TYPE.SYSTEM,
        itemId: systemUid,
    })

    const { open, getRootProps, getInputProps, isDragActive } = useDropzone({
        accept: { 'image/*': [] },
        // block new drops while a mutation is in flight to avoid overlapping optimistic writes
        disabled: !hasEditRole || isMutating,
        noClick: true,
        onDrop: files => {
            // new uploads prepend → focus the first one
            setSelectedId(null)
            uploadImages(files)
        },
    })

    if (isLoading) return <ImagePlaceHolder />

    const foundIndex = images.findIndex(image => image.id === selectedId)
    const selectedIndex = foundIndex >= 0 ? foundIndex : 0
    const currentImage = images[selectedIndex]
    const hasImages = images.length > 0
    const hasMany = images.length > 1
    // optimistic entries have a temp id the backend won't recognize — can't delete yet
    const isTempImage = !!currentImage?.id.startsWith('temp-')

    return (
        <div
            {...getRootProps()}
            className={cn(
                'w-full max-w-full border rounded-md overflow-hidden transition-colors',
                isDragActive && 'border-primary bg-primary/5',
                !hasEditRole && 'cursor-default',
            )}
        >
            {hasImages ? (
                <div>
                    {/* Action bar — edit controls are role-gated, the counter shows for everyone */}
                    {(hasEditRole || hasMany) && (
                        <div className="flex items-center justify-between px-2 py-1 bg-background/95 border-b">
                            <div className="flex items-center gap-1">
                                {hasEditRole && (
                                    <Button
                                        type="button"
                                        variant="outline"
                                        size="sm"
                                        onClick={open}
                                        disabled={isMutating}
                                        className="h-6 text-xs px-2"
                                    >
                                        <Upload className="h-3 w-3 mr-1" />
                                        {fm({ id: message.common.imageGallery.upload })}
                                    </Button>
                                )}
                                {hasEditRole && currentImage && (
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="sm"
                                        onClick={() =>
                                            withWarnModal(
                                                deleteImage,
                                                `${fm({ id: message.common.imageGallery.confirmDelete })} ${currentImage.name}?`,
                                            )(currentImage)
                                        }
                                        disabled={isMutating || isTempImage}
                                        className="h-6 text-xs px-2 text-destructive hover:text-destructive hover:bg-destructive/20"
                                    >
                                        <Trash2 className="h-3 w-3 mr-1" />
                                        {fm({ id: message.common.imageGallery.delete })}
                                    </Button>
                                )}
                            </div>
                            {hasMany && (
                                <div className="text-xs text-muted-foreground font-medium">
                                    {selectedIndex + 1}/{images.length}
                                </div>
                            )}
                        </div>
                    )}

                    {/* Large image */}
                    <div className="relative aspect-[3/2] bg-muted">
                        {currentImage && (
                            <Image
                                src={currentImage.url}
                                alt={currentImage.name}
                                fill
                                unoptimized
                                className="object-contain"
                                sizes="320px"
                            />
                        )}
                        {isMutating && (
                            <div className="absolute inset-0 flex items-center justify-center bg-background/40">
                                <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
                            </div>
                        )}
                    </div>

                    {/* Thumbnail strip */}
                    {hasMany && (
                        <div className="flex items-center justify-center flex-wrap gap-1 px-2 py-1 border-t bg-muted/30">
                            {images.map((image, index) => (
                                <button
                                    key={image.id}
                                    type="button"
                                    onClick={() => setSelectedId(image.id)}
                                    className={cn(
                                        'relative size-6 rounded-sm overflow-hidden border transition-all',
                                        selectedIndex === index
                                            ? 'border-primary ring-1 ring-primary/20'
                                            : 'border-muted-foreground/20 hover:border-muted-foreground/50',
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
                    role={hasEditRole ? 'button' : undefined}
                    tabIndex={hasEditRole ? 0 : undefined}
                    className={cn(
                        'flex flex-col items-center justify-center py-4 px-3 text-center border-2 border-dashed rounded-sm transition-colors',
                        hasEditRole
                            ? 'cursor-pointer hover:border-primary/50 hover:bg-primary/5'
                            : 'cursor-default bg-muted/20',
                        isDragActive && 'border-primary bg-primary/5',
                    )}
                    onClick={hasEditRole ? open : undefined}
                    onKeyDown={
                        hasEditRole
                            ? event => {
                                  if (event.key === 'Enter' || event.key === ' ') {
                                      event.preventDefault()
                                      open()
                                  }
                              }
                            : undefined
                    }
                >
                    <ImageIcon className="h-5 w-5 text-muted-foreground mb-1" />
                    <div className="space-y-0.5">
                        <p className="text-xs font-medium text-foreground">
                            {hasEditRole
                                ? fm({ id: message.common.imageGallery.uploadAnImage })
                                : fm({ id: message.common.imageGallery.noImagesAvailable })}
                        </p>
                        {hasEditRole && (
                            <p className="text-xs text-muted-foreground opacity-75">
                                {fm({ id: message.common.imageGallery.pngJpgInfo })}
                            </p>
                        )}
                    </div>
                </div>
            )}
            <input
                {...getInputProps()}
                aria-label={`${fm({ id: message.common.imageGallery.uploadAnImage })}${
                    systemName ? ` – ${systemName}` : ''
                }`}
            />
        </div>
    )
}
