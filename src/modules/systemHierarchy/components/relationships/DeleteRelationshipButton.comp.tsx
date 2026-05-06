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

    const handleDelete = () => {
        toast.promise(
            deleteRelationship({
                currentSystemUid,
                relatedSystemUid,
                relationshipType,
                direction,
            }),
            {
                loading: fm({ id: message.systemHierarchy.relationships.deleteLoading }),
                success: fm({ id: message.systemHierarchy.relationships.deleteSuccess }),
                error: fm({ id: message.systemHierarchy.relationships.deleteError }),
            },
        )
    }

    return (
        <TableDeleteButton
            onClick={withWarningModal(handleDelete)}
            disabled={isPending}
            className={className}
        />
    )
}
