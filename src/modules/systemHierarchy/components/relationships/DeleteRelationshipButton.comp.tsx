import type { FC } from 'react'
import { useIntl } from 'react-intl'
import { toast } from 'sonner'

import { TableDeleteButton } from '@/components/Buttons'
import useWarningModal from '@/hooks/useWarningModal'
import { message } from '@/i18n/src/messages'
import type { RemovableRelationshipType } from '@/modules/shared/system/system-detail'
import {
    isNotFoundError,
    REMOVABLE_RELATIONSHIP_TYPES,
    useDeleteSystemRelationship,
} from '@/modules/shared/system/system-detail'

interface Props {
    currentSystemUid: string
    relatedSystemUid: string
    relationshipType: string
    direction: 'inbound' | 'outbound'
    className?: string
}

const isRemovableRelationship = (type: string): type is RemovableRelationshipType =>
    (REMOVABLE_RELATIONSHIP_TYPES as readonly string[]).includes(type)

const messages = message.systemHierarchy.relationships

export const DeleteRelationshipButton: FC<Props> = ({
    currentSystemUid,
    relatedSystemUid,
    relationshipType,
    direction,
    className,
}) => {
    const { formatMessage: fm } = useIntl()
    const { deleteRelationship, isPending } = useDeleteSystemRelationship()
    const withWarningModal = useWarningModal(fm({ id: messages.deleteConfirm }))

    // HAS_SUBSYSTEM is structural — moved / deleted through the system itself
    if (!isRemovableRelationship(relationshipType)) return null

    const handleDelete = async () => {
        const toastId = toast.loading(fm({ id: messages.deleteLoading }))
        try {
            await deleteRelationship({
                currentSystemUid,
                relatedSystemUid,
                relationshipType,
                direction,
            })
            toast.success(fm({ id: messages.deleteSuccess }), { id: toastId })
        } catch (error) {
            const messageId = isNotFoundError(error)
                ? messages.deleteNotFound
                : messages.deleteError
            toast.error(fm({ id: messageId }), { id: toastId })
        }
    }

    return (
        <TableDeleteButton
            onClick={withWarningModal(handleDelete)}
            disabled={isPending}
            className={className}
        />
    )
}
