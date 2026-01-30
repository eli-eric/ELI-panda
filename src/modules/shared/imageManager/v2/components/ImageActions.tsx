import { Trash2 } from 'lucide-react'
import { useIntl } from 'react-intl'

import { Button } from '@/components/ui/button'
import useWarningModal from '@/hooks/useWarningModal'
import { message } from '@/i18n/src/messages'

import type { ImageItem } from '../types'

interface ImageActionsProps {
    currentImage?: ImageItem
    hasEditRole?: boolean
    disabled?: boolean
    onDelete?: (imageId: string, imageName: string) => void
}

/**
 * Action buttons for image management
 *
 * Features:
 * - Delete button with confirmation modal
 * - Disabled states
 * - Permission-based visibility
 */
export const ImageActions = ({
    currentImage,
    hasEditRole = false,
    disabled = false,
    onDelete,
}: ImageActionsProps) => {
    const { formatMessage: fm } = useIntl()
    const withWarnModal = useWarningModal()

    if (!hasEditRole || !currentImage) {
        return null
    }

    const handleDelete = () => {
        if (!onDelete || !currentImage) return

        withWarnModal(
            () => onDelete(currentImage.id, currentImage.name),
            `${fm({ id: message.common.imageGallery.confirmDelete })} ${currentImage.name}?`,
        )()
    }

    return (
        <div className="flex items-center gap-1">
            <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={handleDelete}
                disabled={disabled}
                className="h-6 text-xs px-2 text-destructive hover:text-destructive hover:bg-destructive/20"
            >
                <Trash2 className="h-3 w-3 mr-1" />
                {fm({ id: message.common.imageGallery.delete })}
            </Button>
        </div>
    )
}
