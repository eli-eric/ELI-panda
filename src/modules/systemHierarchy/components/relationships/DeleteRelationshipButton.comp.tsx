import type { FC } from 'react'
import { useIntl } from 'react-intl'
import { toast } from 'sonner'

import { TableDeleteButton } from '@/components/Buttons'
import useWarningModal from '@/hooks/useWarningModal'
import { message } from '@/i18n/src/messages'

import { useDeleteRelationship } from '../../hooks/mutations/useDeleteRelationship'

interface Props {
    currentSystemUid: string
    relatedSystemUid: string
    relationshipType: string
    direction: 'inbound' | 'outbound'
    className?: string
}

export const DeleteRelationshipButton: FC<Props> = ({
    currentSystemUid,
    relatedSystemUid,
    relationshipType,
    direction,
    className,
}) => {
    const { formatMessage: fm } = useIntl()
    const { deleteRelationship, isPending } = useDeleteRelationship()

    const withWarningModal = useWarningModal(
        fm({ id: message.systemHierarchy.relationships.deleteConfirm }),
    )

    const handleDelete = async () => {
        const toastId = toast.loading(
            fm({ id: message.systemHierarchy.relationships.deleteLoading }),
        )
        try {
            const deletedCount = await deleteRelationship({
                currentSystemUid,
                relatedSystemUid,
                relationshipType,
                direction,
            })
            if (deletedCount > 0) {
                toast.success(fm({ id: message.systemHierarchy.relationships.deleteSuccess }), {
                    id: toastId,
                })
            } else {
                toast.warning(fm({ id: message.systemHierarchy.relationships.deleteNotFound }), {
                    id: toastId,
                })
            }
        } catch {
            toast.error(fm({ id: message.systemHierarchy.relationships.deleteError }), {
                id: toastId,
            })
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
