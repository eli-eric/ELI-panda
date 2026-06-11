import { ImageIcon, Loader2, Trash2, Upload } from 'lucide-react'
import Image from 'next/image'
import type { FC } from 'react'
import { useEffect, useState } from 'react'
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
import { ROLE } from '@/types/constants/roles'

interface SystemImagePanelProps {
    systemUid: string
    systemName?: string | null
}

export const SystemImagePanel: FC<SystemImagePanelProps> = ({ systemUid, systemName }) => {
    const { formatMessage: fm } = useIntl()
    const hasEditRole = !!usePermission([ROLE.SYSTEM_EDIT])
    const withWarnModal = useWarningModal()
    const [selectedIndex, setSelectedIndex] = useState(0)

    const { images, isLoading, isMutating, uploadImages, deleteImage } = useImageAutoSave({
        itemCategory: FILE_TYPE.SYSTEM,
        itemId: systemUid,
    })

    const { open, getRootProps, getInputProps, isDragActive } = useDropzone({
        accept: { 'image/*': [] },
        disabled: !hasEditRole,
        noClick: true,
        onDrop: files => {
            // new uploads prepend → focus the first one
            setSelectedIndex(0)
            uploadImages(files)
        },
    })

    // keep selection in range as the list changes (delete / refetch)
    useEffect(() => {
        setSelectedIndex(index => Math.min(index, Math.max(0, images.length - 1)))
    }, [images.length])

    if (isLoading) return <ImagePlaceHolder />

    const currentImage = images[selectedIndex]
    const hasImages = images.length > 0
    const hasMany = images.length > 1

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
                    {/* Action bar */}
                    {hasEditRole && (
                        <div className="flex items-center justify-between px-2 py-1 bg-background/95 border-b">
                            <div className="flex items-center gap-1">
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
                                {currentImage && (
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
                                        disabled={isMutating}
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
                                    onClick={() => setSelectedIndex(index)}
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
                    className={cn(
                        'flex flex-col items-center justify-center py-4 px-3 text-center border-2 border-dashed rounded-sm transition-colors',
                        hasEditRole
                            ? 'cursor-pointer hover:border-primary/50 hover:bg-primary/5'
                            : 'cursor-default bg-muted/20',
                        isDragActive && 'border-primary bg-primary/5',
                    )}
                    onClick={hasEditRole ? open : undefined}
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
            <input {...getInputProps()} aria-label={systemName ?? undefined} />
        </div>
    )
}
