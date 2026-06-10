import { useCallback } from 'react'
import { useIntl } from 'react-intl'
import { toast } from 'sonner'

import { usePermission } from '@/hooks/usePermission'
import useWarningModal from '@/hooks/useWarningModal'
import { message } from '@/i18n/src/messages'
import { ROLE } from '@/types/constants/roles'
import type { AxiosError } from '@/types/http'
import { createMessageValues } from '@/utils/formatters'

import { findHierarchyPath } from '../utils/treePath'
import { useDeleteSystem } from './mutations/useDeleteSystem'
import { useSystemHierarchy } from './queries/useSystemHierarchy'
import { useHierarchyNavigation } from './useHierarchyNavigation'

const messages = message.systemHierarchy.delete

const MAX_LISTED_ITEMS = 3

type PhysicalItemConflict = {
    systemUid: string
    systemName: string
    itemUid: string
    itemName: string
}

export const useDeleteSystemAction = () => {
    const { formatMessage: fm } = useIntl()
    const canEdit = usePermission([ROLE.SYSTEM_EDIT])
    const withWarningModal = useWarningModal()
    const { nodes } = useSystemHierarchy()
    const { selectedParentUid, selectedLeafUid, clearSelection } = useHierarchyNavigation()
    const { mutateAsync, isPending } = useDeleteSystem()

    const isOpenOrAncestor = useCallback(
        (uid: string) => {
            if (uid === selectedLeafUid || uid === selectedParentUid) return true
            if (!selectedParentUid) return false
            return findHierarchyPath(nodes, selectedParentUid).some(node => node.uid === uid)
        },
        [nodes, selectedParentUid, selectedLeafUid],
    )

    const buildConflictMessage = useCallback(
        (name: string, data: unknown) => {
            const conflicts = Array.isArray(data) ? (data as PhysicalItemConflict[]) : []
            const itemNames = conflicts.map(conflict => conflict.itemName).filter(Boolean)
            if (itemNames.length === 0) {
                return fm({ id: messages.conflictGeneric }, createMessageValues({ name }))
            }
            const shown = itemNames.slice(0, MAX_LISTED_ITEMS).join(', ')
            const remaining = itemNames.length - MAX_LISTED_ITEMS
            const items = remaining > 0 ? `${shown} +${remaining} more` : shown
            return fm({ id: messages.conflict }, createMessageValues({ name, items }))
        },
        [fm],
    )

    const handleDeleteSystem = useCallback(
        (uid: string, name: string) => {
            if (!canEdit) return

            const runDelete = () => {
                toast.promise(mutateAsync({ uid }), {
                    loading: fm({ id: messages.deleting }),
                    success: () => {
                        if (isOpenOrAncestor(uid)) clearSelection()
                        return fm({ id: messages.success }, createMessageValues({ name }))
                    },
                    error: (error: AxiosError) => {
                        if (error?.response?.status === 409) {
                            return buildConflictMessage(name, error.response.data)
                        }
                        return fm({ id: messages.error }, createMessageValues({ name }))
                    },
                })
            }

            const confirm = fm({ id: messages.confirm }, createMessageValues({ name }))
            withWarningModal(runDelete, confirm)()
        },
        [canEdit, withWarningModal, fm, mutateAsync, isOpenOrAncestor, clearSelection, buildConflictMessage],
    )

    return { canEdit, handleDeleteSystem, isPending }
}
