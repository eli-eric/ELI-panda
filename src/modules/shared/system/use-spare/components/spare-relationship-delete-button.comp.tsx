import type { FC } from 'react'
import { useIntl } from 'react-intl'
import { toast } from 'sonner'

import { TableDeleteButton } from '@/components/Buttons'
import { Tooltip } from '@/components/Tooltip'
import useWarningModal from '@/hooks/useWarningModal'
import { message } from '@/i18n/src/messages'
import { useDeleteSystemRelationship } from '@/modules/shared/system/system-detail/hooks/mutations/useDeleteSystemRelationship'
import { isNotFoundError } from '@/modules/shared/system/system-detail/utils/systemErrors'

interface Props {
    currentSystemUid: string
    relatedSystemUid: string
    direction: 'inbound' | 'outbound'
    canEdit: boolean
    className?: string
}

const messages = message.common.spareAssignment

export const SpareRelationshipDeleteButton: FC<Props> = ({
    currentSystemUid,
    relatedSystemUid,
    direction,
    canEdit,
    className,
}) => {
    const { formatMessage: fm } = useIntl()
    const { deleteRelationship, isPending } = useDeleteSystemRelationship()

    const copy =
        direction === 'outbound'
            ? {
                  confirm: messages.spareFor.remove.confirm,
                  success: messages.spareFor.remove.success,
              }
            : { confirm: messages.remove.confirm, success: messages.remove.success }

    const withWarningModal = useWarningModal(fm({ id: copy.confirm }))

    const handleDelete = async () => {
        const toastId = toast.loading(fm({ id: messages.remove.loading }))
        try {
            await deleteRelationship({
                currentSystemUid,
                relatedSystemUid,
                relationshipType: 'IS_SPARE_FOR',
                direction,
            })
            toast.success(fm({ id: copy.success }), { id: toastId })
        } catch (error) {
            // 404: someone already removed the edge — the refetch drops the stale row
            if (isNotFoundError(error)) {
                toast.warning(fm({ id: messages.remove.notFound }), { id: toastId })
            } else {
                toast.error(fm({ id: messages.remove.error }), { id: toastId })
            }
        }
    }

    return (
        <Tooltip content={!canEdit ? fm({ id: messages.noPermissionTooltip }) : undefined}>
            <TableDeleteButton
                onClick={canEdit ? withWarningModal(handleDelete) : undefined}
                disabled={!canEdit || isPending}
                className={className}
            />
        </Tooltip>
    )
}
